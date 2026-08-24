# Implementation Plan: Admin Dashboard

## Overview

Partial implementations exist for the admin dashboard (categories page, users page, bookings, payments). The work is: add missing create/delete category actions, wire up all pages to the correct API endpoints, and add tests.

## Tasks

- [ ] 1. Create `createAdminCategory` server action
  - Create `src/app/(dashboard)/_actions/createAdminCategory.ts`
  - Call `POST https://fixit-now-backend.vercel.app/api/admin/categories` with `{ name, description }` and `accessToken` cookie
  - Return `{ success, message }` — throw on non-ok response with server's error message
  - _Requirements: 2.2_

- [ ] 2. Create `deleteAdminCategory` server action
  - Create `src/app/(dashboard)/_actions/deleteAdminCategory.ts`
  - Call `DELETE https://fixit-now-backend.vercel.app/api/admin/categories/:id` with `accessToken` cookie
  - Return `{ success, message }`
  - _Requirements: 4.2_

- [ ] 3. Wire category management page
  - Update `src/app/(dashboard)/admin-dashboard/categories/page.tsx` to fetch categories via existing `adminCategories.ts` action
  - Add "Create Category" form/button that calls `createAdminCategory`
  - Wire `AdminCategoriesClient` to call `updateAdminCategory` for edits and `deleteAdminCategory` for deletions
  - Show success/error toasts and refresh list after each operation
  - _Requirements: 2.1, 2.3, 2.4, 3.1, 3.3, 4.1, 4.3_

- [ ]\* 3.1 Write property test for category payload shape
  - **Property 1: Category payload contains exactly name and description**
  - **Validates: Requirements 2.2, 3.2**

- [ ]\* 3.2 Write property test for category validation
  - **Property 2: Category validation rejects empty fields**
  - **Validates: Requirements 2.5**

- [ ] 4. Verify and fix admin users page
  - Confirm `src/app/(dashboard)/admin-dashboard/users/page.tsx` fetches users via `getAllUsers.ts`
  - Confirm `AdminUsersClient` renders the table with all required columns
  - Confirm `UserActionsInAdminDashboard` calls `updateUserStatusByAdmin` with correct `{ status }` payload
  - Show verification status for TECHNICIAN users with a `technicianProfile`
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.7, 5.8_

- [ ]\* 4.1 Write property test for users table rendering
  - **Property 3: Users table renders one row per user**
  - **Validates: Requirements 5.1**

- [ ]\* 4.2 Write property test for status toggle logic
  - **Property 4: Status toggle is a strict inversion**
  - **Validates: Requirements 5.3, 5.4**

- [ ] 5. Checkpoint — ensure all tests pass, ask the user if questions arise.

- [ ] 6. Verify admin bookings pages
  - Confirm `src/app/(dashboard)/admin-dashboard/bookings/page.tsx` fetches via `getAdminBookings.ts`
  - Confirm the table shows: booking ID (truncated), customer name, technician name, service title, date, status badge, payment status badge
  - Confirm clicking a row navigates to `/admin-dashboard/bookings/:id`
  - Confirm the detail page at `[id]/page.tsx` fetches via `getAdminBookingById.ts` and shows full booking info
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ]\* 6.1 Write property test for bookings table row fields
  - **Property 5: Booking table rows contain required fields**
  - **Validates: Requirements 6.2**

- [ ] 7. Verify admin payments pages
  - Confirm `src/app/(dashboard)/admin-dashboard/payments/page.tsx` fetches via `getAdminPayments.ts`
  - Confirm the table shows: payment ID, booking ID, amount + currency, provider, method, status badge, date
  - Confirm clicking a row navigates to `/admin-dashboard/payments/:id`
  - Confirm the detail page fetches via `getAdminPaymentById.ts` and shows full payment info
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ]\* 7.1 Write property test for payments table row fields
  - **Property 6: Payment table rows contain required fields**
  - **Validates: Requirements 7.2**

- [ ] 8. Verify admin dashboard home and profile section
  - Confirm `src/app/(dashboard)/admin-dashboard/page.tsx` calls `getMe` and displays admin name + email
  - Confirm navigation links to Categories, Users, Bookings, Payments are present
  - Confirm loading/skeleton state while profile is fetching
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 9. Final checkpoint — ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Tasks 1 and 2 are the only new server actions that need to be created
- All other tasks are wiring and verification of partially-existing implementations
