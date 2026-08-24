# Requirements: Authentication

## Introduction

This spec covers the authentication system for the FixItNow platform. It includes user registration (CUSTOMER and TECHNICIAN roles), login, profile retrieval, and logout. Auth state is managed via HTTP-only cookies (`accessToken`, `refreshToken`). After login, users are redirected to their role-specific dashboard. The proxy middleware enforces role-based route protection across the entire app.

---

## Glossary

- **User**: A person with an account on the platform. Has a `role` of `CUSTOMER`, `TECHNICIAN`, or `ADMIN`.
- **AccessToken**: A short-lived JWT stored in an HTTP-only cookie, used to authenticate API requests.
- **RefreshToken**: A longer-lived token stored in an HTTP-only cookie, used to obtain new access tokens.
- **Auth_API**: The backend at `https://fixit-now-backend.vercel.app`.
- **Proxy**: The Next.js middleware in `src/proxy.ts` that enforces route-level access control.
- **LoginForm**: The client component on `/login` that collects email and password.
- **RegisterForm**: The client component on `/register` that collects name, email, password, and role.

---

## Requirements

### Requirement 1: User Registration

**User Story:** As a visitor, I want to create an account as either a Customer or Technician, so that I can access the platform's features.

#### Acceptance Criteria

1. WHEN a visitor navigates to `/register`, THE RegisterForm SHALL display a role selector allowing the visitor to choose `CUSTOMER` or `TECHNICIAN` before seeing the registration fields.
2. WHEN a role is selected, THE RegisterForm SHALL display input fields for name, email, and password.
3. WHEN the visitor submits the form with valid name, email, and password, THE System SHALL call `POST https://fixit-now-backend.vercel.app/api/auth/register` with `{ name, email, password, role }`.
4. WHEN registration succeeds, THE System SHALL show a success toast and redirect the user to `/login`.
5. IF registration fails, THEN THE System SHALL display a descriptive error toast with the server's error message.
6. IF any required field is empty, THEN THE RegisterForm SHALL prevent submission and show inline validation errors.

---

### Requirement 2: User Login

**User Story:** As a registered user, I want to sign in with my email and password, so that I can access my role-specific dashboard.

#### Acceptance Criteria

1. WHEN a visitor navigates to `/login`, THE LoginForm SHALL display email and password input fields.
2. WHEN the visitor submits valid credentials, THE System SHALL call `POST https://fixit-now-backend.vercel.app/api/auth/login` with `{ email, password }`.
3. WHEN login succeeds, THE System SHALL store `accessToken` and `refreshToken` as HTTP-only cookies.
4. WHEN login succeeds and the user role is `CUSTOMER`, THE System SHALL redirect to `/dashboard`.
5. WHEN login succeeds and the user role is `TECHNICIAN`, THE System SHALL redirect to `/technician-dashboard`.
6. WHEN login succeeds and the user role is `ADMIN`, THE System SHALL redirect to `/admin-dashboard`.
7. IF login fails, THEN THE System SHALL display a descriptive error toast with the server's error message.
8. IF an authenticated user visits `/login` or `/register`, THEN THE Proxy SHALL redirect them to their role-appropriate dashboard.

---

### Requirement 3: Profile Retrieval

**User Story:** As an authenticated user, I want my profile information to be available throughout the app, so that the UI can display my name and tailor content to my role.

#### Acceptance Criteria

1. WHEN an authenticated request is made, THE System SHALL call `GET https://fixit-now-backend.vercel.app/api/auth/me` with the `accessToken` cookie to retrieve the user profile.
2. THE Profile SHALL contain: `id`, `name`, `email`, `role`, `status`, `createdAt`, and `updatedAt`.
3. WHEN the `accessToken` cookie is absent, THE System SHALL return a failure response without making an API call.
4. THE System SHALL cache the profile response and invalidate the cache on logout.

---

### Requirement 4: Logout

**User Story:** As an authenticated user, I want to log out, so that my session is ended and I can return to the public site.

#### Acceptance Criteria

1. WHEN a user triggers logout, THE System SHALL call `POST https://fixit-now-backend.vercel.app/api/auth/logout`.
2. WHEN logout is triggered, THE System SHALL delete the `accessToken` and `refreshToken` cookies.
3. WHEN logout completes, THE System SHALL invalidate the cached profile and redirect to `/login`.

---

### Requirement 5: Route Protection (Proxy)

**User Story:** As a platform operator, I want routes to be protected by role, so that users can only access areas relevant to their role.

#### Acceptance Criteria

1. WHEN an unauthenticated user attempts to access a protected route, THE Proxy SHALL redirect to `/login?from=<attempted_path>`.
2. WHEN an authenticated `CUSTOMER` attempts to access `/admin-dashboard` or `/technician-dashboard`, THE Proxy SHALL redirect to `/login`.
3. WHEN an authenticated `TECHNICIAN` attempts to access `/dashboard` or `/admin-dashboard`, THE Proxy SHALL redirect to `/login`.
4. WHEN an authenticated `ADMIN` attempts to access `/dashboard` or `/technician-dashboard`, THE Proxy SHALL redirect to `/login`.
5. THE Proxy SHALL allow all roles to access public routes (`/`, `/services`, `/find-technicians`, and their sub-paths) without authentication.
