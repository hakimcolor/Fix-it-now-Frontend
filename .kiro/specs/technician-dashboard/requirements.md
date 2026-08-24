# Requirements: Technician Dashboard

## Introduction

This spec covers the technician-facing features of the FixItNow platform. Technicians can manage their profile, set availability, create and manage their services, view and respond to bookings, track earnings, and see the payment status of completed jobs. The technician dashboard is accessible only to users with the `TECHNICIAN` role and is protected by the proxy middleware.

---

## Glossary

- **Technician**: An authenticated user with role `TECHNICIAN`.
- **Technician_API**: The backend at `https://fixit-now-backend.vercel.app`.
- **TechnicianProfile**: The extended profile of a technician including bio, skills, experience, hourly rate, location, and availability.
- **Availability**: A weekly schedule object mapping day names to arrays of time slot strings (e.g., `{ "monday": ["09:00-12:00"] }`).
- **Service**: A service offering created by the technician, managed via `/api/services` and `/api/technician/services`.
- **Booking**: A service reservation from a customer, managed via `/api/technician/bookings`.
- **Booking Status**: One of `REQUESTED | ACCEPTED | DECLINED | IN_PROGRESS | COMPLETED | CANCELLED`.
- **TechnicianDashboard**: The `/technician-dashboard` route group, accessible only to `TECHNICIAN` role.

---

## Requirements

### Requirement 1: Technician Dashboard Home

**User Story:** As a technician, I want a dashboard home page that summarizes my activity, so that I can quickly see the state of my bookings and earnings.

#### Acceptance Criteria

1. WHEN a technician visits `/technician-dashboard`, THE TechnicianDashboard SHALL display a welcome message with the technician's name fetched from `GET /api/auth/me`.
2. THE TechnicianDashboard SHALL show summary stat cards for: Total Bookings, Pending Requests, Accepted Bookings, Completed Jobs, and Total Earnings.
3. THE TechnicianDashboard SHALL provide quick navigation links to: My Services, My Bookings, Profile, Availability, and Earnings.

---

### Requirement 2: Technician Profile Management

**User Story:** As a technician, I want to update my profile information, so that customers can see my qualifications and contact details.

#### Acceptance Criteria

1. WHEN a technician visits `/technician-dashboard/profile`, THE System SHALL fetch the technician's current profile via `GET /api/auth/me` and display the current values.
2. WHEN a technician visits `/technician-dashboard/profile/edit`, THE System SHALL display a form pre-populated with: bio, skills (as a comma-separated or tag input), experience (years), hourly rate, and location.
3. WHEN the technician submits the form, THE System SHALL call `PUT https://fixit-now-backend.vercel.app/api/technician/profile` with `{ bio, skills, experience, hourlyRate, location }`.
4. WHEN the update succeeds, THE System SHALL show a success toast and redirect to `/technician-dashboard/profile`.
5. IF the update fails, THEN THE System SHALL show a descriptive error toast with the server's error message.

---

### Requirement 3: Availability Management

**User Story:** As a technician, I want to set my weekly availability, so that customers can book me during the correct hours.

#### Acceptance Criteria

1. WHEN a technician visits `/technician-dashboard/availability`, THE System SHALL display the current availability schedule with the existing time slots for each day of the week.
2. THE AvailabilityScheduler SHALL allow the technician to add or remove time slots for each day (Monday through Sunday).
3. WHEN the technician saves the availability, THE System SHALL call `PUT https://fixit-now-backend.vercel.app/api/technician/availability` with `{ availability: { monday: [...], tuesday: [...], ... } }`.
4. WHEN the save succeeds, THE System SHALL show a success toast.
5. IF the save fails, THEN THE System SHALL show a descriptive error toast.

---

### Requirement 4: Service Management — Create

**User Story:** As a technician, I want to create new services, so that customers can find and book the work I offer.

#### Acceptance Criteria

1. WHEN a technician visits `/technician-dashboard/services/create`, THE System SHALL display a form with fields for: title, description, price, and category (dropdown populated from `GET /api/categories`).
2. WHEN the technician submits the form with valid data, THE System SHALL call `POST https://fixit-now-backend.vercel.app/api/services` with `{ title, description, price, categoryId }`.
3. WHEN service creation succeeds, THE System SHALL show a success toast and redirect to `/technician-dashboard/services`.
4. IF service creation fails, THEN THE System SHALL show a descriptive error toast.
5. IF any required field is empty, THEN THE System SHALL prevent submission and show inline validation errors.

---

### Requirement 5: Service Management — View & Edit

**User Story:** As a technician, I want to view and edit my existing services, so that I can keep them accurate and up to date.

#### Acceptance Criteria

1. WHEN a technician visits `/technician-dashboard/services`, THE System SHALL fetch the technician's services via `GET https://fixit-now-backend.vercel.app/api/technician/services` and display them as a list.
2. THE ServiceList SHALL show for each service: title, description, price, and category name.
3. WHEN a technician clicks on a service, THE System SHALL navigate to `/technician-dashboard/services/[serviceId]` and display the full service detail.
4. WHEN a technician clicks edit on a service, THE System SHALL navigate to `/technician-dashboard/services/[serviceId]/edit` with a pre-populated form.
5. WHEN the technician submits the edit form, THE System SHALL call `PATCH /api/services/:id` with the updated fields.
6. WHEN the edit succeeds, THE System SHALL show a success toast and redirect to the service detail page.
7. WHEN a technician clicks delete on a service, THE System SHALL show a confirmation dialog, then call `DELETE /api/services/:id` on confirmation.
8. WHEN deletion succeeds, THE System SHALL show a success toast and remove the service from the list.

---

### Requirement 6: Booking Management

**User Story:** As a technician, I want to view all my bookings and update their status, so that I can manage my workload effectively.

#### Acceptance Criteria

1. WHEN a technician visits `/technician-dashboard/bookings`, THE System SHALL fetch bookings via `GET https://fixit-now-backend.vercel.app/api/technician/bookings` and display them in a table.
2. THE Table SHALL show for each booking: customer name, service title, scheduled date, booking status badge, and action buttons.
3. WHEN the booking status is `REQUESTED`, THE System SHALL show "Accept" and "Decline" buttons.
4. WHEN a technician clicks "Accept", THE System SHALL call `PATCH /api/bookings/:id/status` with `{ status: "ACCEPTED" }` and update the row.
5. WHEN a technician clicks "Decline", THE System SHALL call `PATCH /api/bookings/:id/status` with `{ status: "DECLINED" }` and update the row.
6. WHEN the booking status is `PAID`, THE System SHALL show a "Mark In Progress" button.
7. WHEN a technician clicks "Mark In Progress", THE System SHALL call `PATCH /api/bookings/:id/status` with `{ status: "IN_PROGRESS" }` and update the row.
8. WHEN the booking status is `IN_PROGRESS`, THE System SHALL show a "Mark Complete" button.
9. WHEN a technician clicks "Mark Complete", THE System SHALL call `PATCH /api/bookings/:id/status` with `{ status: "COMPLETED" }` and update the row.
10. WHEN any status update succeeds, THE System SHALL show a success toast.
11. IF any status update fails, THEN THE System SHALL show a descriptive error toast.
12. WHEN a technician clicks on a booking, THE System SHALL navigate to `/technician-dashboard/bookings/[id]` and display the full booking detail.

---

### Requirement 7: Earnings View

**User Story:** As a technician, I want to view my earnings history, so that I can track my income from completed services.

#### Acceptance Criteria

1. WHEN a technician visits `/technician-dashboard/earnings`, THE System SHALL display a summary of total earnings from bookings with `status === 'COMPLETED'`.
2. THE EarningsPage SHALL display a list or table of completed bookings with: service title, customer name, completion date, and amount earned.
3. WHEN there are no completed bookings, THE EarningsPage SHALL display an empty state message.
