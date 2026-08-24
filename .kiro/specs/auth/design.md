# Design: Authentication

## Overview

The FixItNow auth system is implemented inside the Next.js App Router under the `(auth)` route group. It uses React Hook Form + Zod for client-side validation, server actions for API calls, and HTTP-only cookies for session management. The proxy middleware (`src/proxy.ts`) enforces role-based route protection at the edge.

Tech stack: Next.js 16.2.11, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, React Hook Form + Zod, Sonner (toasts), jsonwebtoken (JWT decode), Vitest + fast-check (testing).

Most of the auth implementation already exists. This design describes the complete target state and identifies any gaps.

---

## Architecture

```
(auth) layout — minimal centered layout, no nav/footer
├── /login        — LoginPage (client component)
└── /register     — RegisterPage → RoleSelector → RegisterForm

src/app/(auth)/_actions/
  loginUser.ts     — server action: POST /api/auth/login, set cookies, redirect
  registerUser.ts  — server action: POST /api/auth/register

src/services/
  getMe.ts         — cached server fetch: GET /api/auth/me
  logout.ts        — server action: delete cookies, revalidate cache

src/proxy.ts       — Next.js middleware: route-level role guards
```

All API calls use the base URL `https://fixit-now-backend.vercel.app` directly (no `.env` for the base URL per project convention — JWT secret only from `.env`).

---

## Components and Interfaces

### Existing (already implemented)

- `RegisterPage` — role selection flow (`RoleSelector` → `RegisterForm`)
- `RoleSelector` — two-card selector for CUSTOMER / TECHNICIAN
- `RegisterForm` — name/email/password form with hidden role field
- `LoginPage` — email/password form with show/hide password toggle
- `DemoCredentials` — pre-fills demo credentials for testing
- `loginUser` server action — POST login, set cookies, redirect by role
- `registerUser` server action — POST register
- `getMe` — cached GET `/api/auth/me` with `accessToken` cookie
- `logout` — delete both cookies, `revalidateTag('my-profile')`
- `proxy.ts` — route guards by role

### Schemas

```ts
// src/schemas/login.schema.ts
{ email: string (email), password: string (min 5) }

// src/schemas/register.schema.ts
{ name: string (min 3), email: string (email), password: string (min 6), role: 'CUSTOMER' | 'TECHNICIAN' }
```

### Data Models

```ts
// API response from GET /api/auth/me
{
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    role: 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN';
    status: 'ACTIVE' | 'BANNED';
    createdAt: string;
    updatedAt: string;
  }
}

// API response from POST /api/auth/login
{
  success: boolean;
  data: {
    accessToken: string; // JWT, contains { role } in payload
    refreshToken: string;
  }
}
```

### Role → Redirect Mapping

```ts
const ROLE_REDIRECTS = {
  CUSTOMER: '/dashboard',
  ADMIN: '/admin-dashboard',
  TECHNICIAN: '/technician-dashboard',
} as const;
```

---

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property-Based Testing Overview

Library: **fast-check** | Runner: **Vitest** | Minimum 100 iterations per test.
Tag format: `Feature: auth, Property N: <property_text>`

---

### Property 1: Register payload contains all required fields

_For any_ valid name (min 3 chars), email, password (min 6 chars), and role (`CUSTOMER` or `TECHNICIAN`), the payload forwarded to `POST /api/auth/register` must contain exactly `{ name, email, password, role }` with no field mutation or omission.

**Validates: Requirements 1.3**

---

### Property 2: Register validation rejects incomplete inputs

_For any_ combination of form fields where at least one required field (name, email, password) is empty or missing, the Zod schema validation must return a failure result and not produce a valid `RegisterFormData` object.

**Validates: Requirements 1.6**

---

### Property 3: Login payload contains exactly email and password

_For any_ email string and password string, the payload forwarded to `POST /api/auth/login` must contain exactly `{ email, password }` with no extra fields added.

**Validates: Requirements 2.2**

---

### Property 4: Role-based redirect is deterministic

_For any_ role value (`CUSTOMER`, `TECHNICIAN`, `ADMIN`), the redirect target after successful login or after an authenticated user visits an auth route must equal the correct dashboard path:

- `CUSTOMER` → `/dashboard`
- `TECHNICIAN` → `/technician-dashboard`
- `ADMIN` → `/admin-dashboard`

**Validates: Requirements 2.4, 2.5, 2.6, 2.8**

---

### Property 5: Proxy blocks wrong-role access deterministically

_For any_ (role, protected-route-prefix) pair where the role does not match the route's required role, the proxy must return a redirect response to `/login`. Specifically:

- `CUSTOMER` + `/admin-dashboard/*` or `/technician-dashboard/*` → redirect
- `TECHNICIAN` + `/dashboard/*` or `/admin-dashboard/*` → redirect
- `ADMIN` + `/dashboard/*` or `/technician-dashboard/*` → redirect
- Unauthenticated + any non-public, non-auth route → redirect with `?from=` param

**Validates: Requirements 5.1, 5.2, 5.3, 5.4**

---

## Error Handling

| Scenario                                    | Behavior                                                     |
| ------------------------------------------- | ------------------------------------------------------------ |
| `registerUser` API returns error            | Throws `Error(result.message)`, caught in form → error toast |
| `loginUser` API returns non-ok              | Returns `{ success: false, message }` → error toast          |
| `getMe` called without `accessToken` cookie | Returns `{ success: false, message: 'User not logged in!' }` |
| Proxy: no token, accessing protected route  | Redirect to `/login?from=<path>`                             |
| Proxy: wrong role for route                 | Redirect to `/login`                                         |

---

## Testing Strategy

### Dual Testing Approach

- **Unit tests**: Verify specific login/register flows, error states, cookie behavior
- **Property tests**: Verify payload shapes, validation rejection, role-redirect mapping, proxy rules

### Test File Locations

```
src/app/(auth)/__tests__/
  registerPayload.test.ts    — Property 1, Property 2
  loginPayload.test.ts       — Property 3
  roleRedirect.test.ts       — Property 4
  proxyGuards.test.ts        — Property 5
```

### Property Test Configuration

Each test annotated with: `// Feature: auth, Property N: <text>`
Minimum 100 iterations via `fc.assert(fc.property(...), { numRuns: 100 })`.
