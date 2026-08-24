# Design: Admin Dashboard

## Overview

The FixItNow admin dashboard is built inside the Next.js App Router under the `(dashboard)` route group, sharing the dashboard layout. It is protected to `ADMIN` role only via the proxy middleware. Partial implementations already exist (categories page, users page, bookings, payments). This design describes the complete target state.

Tech stack: Next.js 16.2.11, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, React Hook Form + Zod, Sonner (toasts), Vitest + fast-check (testing).

---

## Architecture

```
(dashboard) layout — DashboardSidebar + DashboardNavbar, role-guarded (ADMIN only)
└── /admin-dashboard
    ├── page.tsx                          — Admin home + profile
    ├── /categories
    │   ├── page.tsx                      — Category list + create form
    │   └── AdminCategoriesClient.tsx     — Client component with edit/delete
    ├── /users
    │   ├── page.tsx                      — All users table
    │   └── AdminUsersClient.tsx          — Client component with status toggle
    ├── /bookings
    │   ├── page.tsx                      — All bookings table
    │   └── [id]/page.tsx                 — Booking detail
    └── /payments
        ├── page.tsx                      — All payments table
        └── [id]/page.tsx                 — Payment detail
```

All data fetching uses `'use server'` actions. The `accessToken` cookie is forwarded on every request.

---

## Components and Interfaces

### Existing (already partially implemented)

- `AdminCategoriesClient` — client wrapper for category edit/delete actions
- `AdminUsersClient` — client wrapper for user status toggle
- `UserActionsInAdminDashboard` — action buttons (ban/unban) per user row

### Server Actions (in `src/app/(dashboard)/_actions/`)

| Action                       | Method + URL                      | Purpose               |
| ---------------------------- | --------------------------------- | --------------------- |
| `adminCategories.ts`         | GET `/api/admin/categories`       | Fetch all categories  |
| `updateAdminCategory.ts`     | PATCH `/api/admin/categories/:id` | Update category       |
| `getAllUsers.ts`             | GET `/api/admin/users`            | Fetch all users       |
| `updateUserStatusByAdmin.ts` | PATCH `/api/admin/users/:id`      | Ban/unban user        |
| `getAdminBookings.ts`        | GET `/api/admin/bookings`         | Fetch all bookings    |
| `getAdminBookingById.ts`     | GET `/api/admin/bookings/:id`     | Single booking detail |
| `getAdminPayments.ts`        | GET `/api/admin/payments`         | Fetch all payments    |
| `getAdminPaymentById.ts`     | GET `/api/admin/payments/:id`     | Single payment detail |

New actions needed:

- `createAdminCategory.ts` — POST `/api/admin/categories`
- `deleteAdminCategory.ts` — DELETE `/api/admin/categories/:id`

---

## Data Models

### Category

```ts
{
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    services: number;
  }
}
```

### User (admin view)

```ts
{
  id: string
  name: string
  email: string
  role: 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN'
  status: 'ACTIVE' | 'BANNED'
  createdAt: string
  updatedAt: string
  technicianProfile?: {
    id: string
    userId: string
    bio: string | null
    skills: string[]
    experience: number
    hourlyRate: number
    location: string
    totalReviews: number
    averageRating: number
    isVerified: boolean
  }
}
```

### Status Toggle Logic

```ts
// For any user:
const nextStatus = user.status === 'ACTIVE' ? 'BANNED' : 'ACTIVE';
// Call: PATCH /api/admin/users/:id with { status: nextStatus }
```

---

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property-Based Testing Overview

Library: **fast-check** | Runner: **Vitest** | Minimum 100 iterations per test.
Tag format: `Feature: admin-dashboard, Property N: <property_text>`

---

### Property 1: Category payload contains exactly name and description

_For any_ category name string and description string, the payload submitted to `POST /api/admin/categories` (create) and `PATCH /api/admin/categories/:id` (update) must contain exactly `{ name, description }` with no extra or missing fields.

**Validates: Requirements 2.2, 3.2**

---

### Property 2: Category validation rejects empty fields

_For any_ combination where name or description is an empty or whitespace-only string, the Zod validation schema must return a failure and prevent the API call from being made.

**Validates: Requirements 2.5**

---

### Property 3: Users table renders one row per user

_For any_ non-empty array of users returned by the API, the rendered users table must contain exactly as many data rows as there are users in the array.

**Validates: Requirements 5.1**

---

### Property 4: Status toggle is a strict inversion

_For any_ user with `status === 'ACTIVE'`, the computed next status must be `'BANNED'`. _For any_ user with `status === 'BANNED'`, the computed next status must be `'ACTIVE'`. Toggling twice returns the original value.

**Validates: Requirements 5.3, 5.4**

---

### Property 5: Booking table rows contain required fields

_For any_ non-empty array of bookings, each rendered row must contain: a booking ID, customer name, service title, booking date, and status indicator.

**Validates: Requirements 6.2**

---

### Property 6: Payment table rows contain required fields

_For any_ non-empty array of payments, each rendered row must contain: a payment ID, booking ID, amount with currency, provider, method, status indicator, and formatted date.

**Validates: Requirements 7.2**

---

## Error Handling

| Scenario                                             | Behavior                              |
| ---------------------------------------------------- | ------------------------------------- |
| `createAdminCategory` fails                          | Error toast with server message       |
| `updateAdminCategory` fails                          | Error toast with server message       |
| `deleteAdminCategory` fails                          | Error toast, category remains in list |
| `updateUserStatusByAdmin` fails                      | Error toast, status unchanged in UI   |
| `getAdminBookings` / `getAdminPayments` throws       | Empty state shown, no crash           |
| Admin visits `/admin-dashboard` without `ADMIN` role | Proxy redirects to `/login`           |

---

## Testing Strategy

### Dual Testing Approach

- **Unit tests**: Verify create/delete flows, error toasts, empty states
- **Property tests**: Verify payload shapes, validation rejection, table rendering, status toggle logic

### Test File Locations

```
src/app/(dashboard)/__tests__/
  adminCategoryPayload.test.ts  — Property 1, Property 2
  adminUsersTable.test.ts       — Property 3
  adminStatusToggle.test.ts     — Property 4
  adminBookingsTable.test.ts    — Property 5
  adminPaymentsTable.test.ts    — Property 6
```

Each test annotated with: `// Feature: admin-dashboard, Property N: <text>`
Minimum 100 iterations via `fc.assert(fc.property(...), { numRuns: 100 })`.
