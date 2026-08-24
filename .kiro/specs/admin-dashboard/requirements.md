# Requirements: Admin Dashboard

## Introduction

This spec covers the admin-facing features of the FixItNow platform. Admins can manage service categories, view and moderate all users, view all bookings, and view all payments. The admin dashboard is accessible only to users with the `ADMIN` role and is protected by the proxy middleware.

---

## Glossary

- **Admin**: An authenticated user with role `ADMIN`.
- **Admin_API**: The backend at `https://fixit-now-backend.vercel.app`.
- **Category**: A service category with a name and description, managed via `/api/admin/categories`.
- **User**: A platform user (CUSTOMER or TECHNICIAN) manageable via `/api/admin/users`.
- **AdminDashboard**: The `/admin-dashboard` route group, accessible only to `ADMIN` role.

---

## Requirements

### Requirement 1: Admin Dashboard Home & Profile

**User Story:** As an admin, I want a dashboard home page that shows my profile and a summary of platform activity, so that I can quickly understand the state of the platform.

#### Acceptance Criteria

1. WHEN an admin visits `/admin-dashboard`, THE AdminDashboard SHALL display the admin's name and email fetched from `GET /api/auth/me`.
2. THE AdminDashboard SHALL provide navigation links to: Categories, All Users, All Bookings, All Payments.
3. WHEN the admin profile is loading, THE AdminDashboard SHALL show a skeleton or loading state.

---

### Requirement 2: Category Management — Create

**User Story:** As an admin, I want to create new service categories, so that technicians can assign their services to relevant categories.

#### Acceptance Criteria

1. WHEN an admin visits the categories page, THE AdminDashboard SHALL display a form or button to create a new category.
2. WHEN the admin submits a category with a valid name and description, THE System SHALL call `POST https://fixit-now-backend.vercel.app/api/admin/categories` with `{ name, description }`.
3. WHEN category creation succeeds, THE System SHALL show a success toast and refresh the categories list.
4. IF category creation fails, THEN THE System SHALL show a descriptive error toast with the server's error message.
5. IF name or description is empty, THEN THE System SHALL prevent submission and show inline validation errors.

---

### Requirement 3: Category Management — Update

**User Story:** As an admin, I want to edit existing categories, so that I can correct names or descriptions.

#### Acceptance Criteria

1. WHEN an admin clicks on an existing category, THE System SHALL display an edit form pre-populated with the category's current name and description.
2. WHEN the admin submits the updated values, THE System SHALL call `PATCH https://fixit-now-backend.vercel.app/api/admin/categories/:id` with the updated `{ name, description }`.
3. WHEN the update succeeds, THE System SHALL show a success toast and refresh the categories list.
4. IF the update fails, THEN THE System SHALL show a descriptive error toast.

---

### Requirement 4: Category Management — Delete

**User Story:** As an admin, I want to delete categories that are no longer needed, so that the category list stays clean.

#### Acceptance Criteria

1. WHEN an admin clicks a delete action on a category, THE System SHALL display a confirmation dialog before proceeding.
2. WHEN the admin confirms deletion, THE System SHALL call `DELETE https://fixit-now-backend.vercel.app/api/admin/categories/:id`.
3. WHEN deletion succeeds, THE System SHALL show a success toast and remove the category from the list.
4. IF deletion fails, THEN THE System SHALL show a descriptive error toast.

---

### Requirement 5: All Users Management

**User Story:** As an admin, I want to view all users on the platform and manage their status, so that I can enforce community standards.

#### Acceptance Criteria

1. WHEN an admin visits `/admin-dashboard/users`, THE AdminDashboard SHALL fetch all users via `GET https://fixit-now-backend.vercel.app/api/admin/users` and display them in a table.
2. THE Table SHALL show for each user: name, email, role, status badge, account creation date, and a status toggle action.
3. WHEN an admin clicks the status toggle for an `ACTIVE` user, THE System SHALL call `PATCH https://fixit-now-backend.vercel.app/api/admin/users/:id` with `{ status: "BANNED" }`.
4. WHEN an admin clicks the status toggle for a `BANNED` user, THE System SHALL call `PATCH https://fixit-now-backend.vercel.app/api/admin/users/:id` with `{ status: "ACTIVE" }`.
5. WHEN the status update succeeds, THE System SHALL show a success toast and reflect the new status in the table.
6. IF the status update fails, THEN THE System SHALL show a descriptive error toast.
7. WHEN a user has a `technicianProfile`, THE Table SHALL optionally show verification status for TECHNICIAN users.
8. WHEN there are no users, THE AdminDashboard SHALL display an empty state message.

---

### Requirement 6: All Bookings View

**User Story:** As an admin, I want to view all bookings on the platform, so that I can monitor activity and resolve disputes.

#### Acceptance Criteria

1. WHEN an admin visits `/admin-dashboard/bookings`, THE AdminDashboard SHALL fetch all bookings via `GET https://fixit-now-backend.vercel.app/api/admin/bookings` and display them in a table.
2. THE Table SHALL show: booking ID (truncated), customer name, technician name, service title, booking date, status badge, and payment status badge.
3. WHEN an admin clicks a booking row, THE System SHALL navigate to `/admin-dashboard/bookings/:id` and display the full booking detail.
4. WHEN there are no bookings, THE AdminDashboard SHALL display an empty state message.

---

### Requirement 7: All Payments View

**User Story:** As an admin, I want to view all payments on the platform, so that I can monitor revenue and investigate payment issues.

#### Acceptance Criteria

1. WHEN an admin visits `/admin-dashboard/payments`, THE AdminDashboard SHALL fetch all payments via `GET https://fixit-now-backend.vercel.app/api/admin/payments` and display them in a table.
2. THE Table SHALL show: payment ID (truncated), booking ID (truncated), amount with currency, provider, method, status badge, and date.
3. WHEN an admin clicks a payment row, THE System SHALL navigate to `/admin-dashboard/payments/:id` and display the full payment detail.
4. WHEN there are no payments, THE AdminDashboard SHALL display an empty state message.
