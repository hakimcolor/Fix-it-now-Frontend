# Implementation Plan: Technician Dashboard

## Overview

Most technician dashboard pages exist with partial implementations. The work is: verify all pages call the correct API endpoints with the right payloads, ensure booking status transitions are correct, and add tests.

## Tasks

- [ ] 1. Verify technician dashboard home page
  - Confirm `src/app/(dashboard)/technician-dashboard/page.tsx` calls `getMe` and displays the technician's name
  - Confirm stat cards are computed from the bookings array (total, pending REQUESTED, accepted ACCEPTED, completed COMPLETED, earnings)
  - Confirm navigation links to Services, Bookings, Profile, Availability, Earnings are present
  - _Requirements: 1.1, 1.2, 1.3_

- [ ]\* 1.1 Write property test for technician stat calculations
  - **Property 1: Stat counts and earnings are consistent with the bookings array**
  - **Validates: Requirements 1.2, 7.1**

- [ ] 2. Verify technician profile pages
  - Confirm `src/app/(dashboard)/technician-dashboard/profile/page.tsx` fetches and displays current profile data via `getMyTechnicianProfile`
  - Confirm `src/app/(dashboard)/technician-dashboard/profile/edit/page.tsx` pre-populates the form with current values
  - Confirm form submission calls `PUT https://fixit-now-backend.vercel.app/api/technician/profile` with `{ bio, skills, experience, hourlyRate, location }`
  - Confirm success toast + redirect to `/technician-dashboard/profile` on success
  - Confirm error toast on failure
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ]\* 2.1 Write property test for profile update payload shape
  - **Property 2: Profile update payload contains exactly the required fields**
  - **Validates: Requirements 2.3**

- [ ] 3. Verify availability management page
  - Confirm `src/app/(dashboard)/technician-dashboard/availability/page.tsx` displays current availability from the technician's profile
  - Confirm `AvailabilityScheduler` allows adding/removing time slots per day
  - Confirm save calls `PUT https://fixit-now-backend.vercel.app/api/technician/availability` with `{ availability: { monday: [...], ... } }`
  - Confirm success/error toasts
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ]\* 3.1 Write property test for availability payload wrapping
  - **Property 3: Availability payload wraps the schedule correctly**
  - **Validates: Requirements 3.3**

- [ ] 4. Checkpoint — ensure all tests pass, ask the user if questions arise.

- [ ] 5. Verify service create page
  - Confirm `src/app/(dashboard)/technician-dashboard/services/create/page.tsx` renders a form with title, description, price, and category dropdown
  - Confirm category dropdown is populated from `GET /api/categories`
  - Confirm form submission calls `POST https://fixit-now-backend.vercel.app/api/services` with `{ title, description, price, categoryId }`
  - Confirm success toast + redirect to `/technician-dashboard/services`
  - Confirm validation prevents submission when any required field is empty
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ]\* 5.1 Write property test for service create payload shape
  - **Property 4: Service create payload contains exactly the required fields**
  - **Validates: Requirements 4.2**

- [ ] 6. Verify services list, detail, and edit pages
  - Confirm `services/page.tsx` fetches via `getTechnicianServices` and displays all services with title, description, price, category
  - Confirm `services/[serviceId]/page.tsx` fetches via `getServiceById` and shows full details
  - Confirm `services/[serviceId]/edit/page.tsx` pre-populates form and calls `PATCH /api/services/:id` on submit
  - Confirm `DeleteServiceButton` shows confirmation dialog and calls `deleteServiceByTechnician`
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_

- [ ] 7. Verify and fix bookings management page
  - Confirm `src/app/(dashboard)/technician-dashboard/bookings/page.tsx` fetches via `getAllBookingsByTechnician`
  - Confirm the table shows: customer name, service title, scheduled date, status badge, and correct action buttons per status
  - Confirm action buttons call `updateBookingStatus` with the correct next status:
    - REQUESTED → Accept (`ACCEPTED`) / Decline (`DECLINED`)
    - PAID → Mark In Progress (`IN_PROGRESS`)
    - IN_PROGRESS → Mark Complete (`COMPLETED`)
  - Confirm success/error toasts and table refresh after each action
  - Confirm clicking a booking navigates to `/technician-dashboard/bookings/[id]`
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 6.10, 6.11, 6.12_

- [ ]\* 7.1 Write property test for technician booking action buttons
  - **Property 5: Technician booking action buttons match booking status**
  - **Validates: Requirements 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9**

- [ ] 8. Verify earnings page
  - Confirm `src/app/(dashboard)/technician-dashboard/earnings/page.tsx` shows total earnings from COMPLETED bookings
  - Confirm the list shows: service title, customer name, completion date, and amount per booking
  - Confirm empty state when no COMPLETED bookings exist
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 9. Final checkpoint — ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- No new server actions need to be created — all actions already exist
- The stat computation logic should be extracted as a pure `computeStats(bookings)` function for easy testing
- The `TECHNICIAN_STATUS_TRANSITIONS` mapping should be a constant for use in both the UI and tests
