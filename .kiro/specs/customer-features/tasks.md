# Implementation Plan: Customer Features

## Overview

Most customer pages already exist. The work is: fix the `createBooking` import bug, create the missing booking-success page, and ensure all pages wire correctly to the real API. Tests are added as optional sub-tasks close to each implementation task.

## Tasks

- [ ] 1. Fix `createBooking` server action — replace invalid `updateTag` import
  - `src/app/(dashboard)/_actions/createBooking.ts` imports `updateTag` from `'next/cache'` which does not exist in Next.js 16 — replace with `revalidateTag`
  - _Requirements: 2.4_

- [ ]\* 1.1 Write unit test for createBooking payload shape
  - Verify the action forwards `technicianId`, `serviceId`, `note`, `bookingSlotIds` correctly
  - **Feature: customer-features, Property 4: Booking payload contains required fields**
  - _Requirements: 2.4_

- [ ] 2. Create `/dashboard/booking-success` page
  - Create `src/app/(dashboard)/dashboard/booking-success/page.tsx`
  - Show a success card: green checkmark icon, "Booking Submitted!" heading, short confirmation message
  - Provide two buttons: "View My Bookings" → `/dashboard/my-bookings` and "Browse More Services" → `/services`
  - _Requirements: 3.1, 3.2_

- [ ]\* 2.1 Write unit test for booking-success page
  - Verify page renders success message and both navigation links
  - _Requirements: 3.1, 3.2_

- [ ] 3. Verify and fix `/dashboard/my-bookings` — booking history table
  - Confirm `getAllBookings` is called and results are filtered by `user.data.id`
  - Confirm all status-based action buttons render correctly per the logic in design.md
  - Confirm `CancelBookingButton`, "Pay Now", "Leave Review", and "View Details" links are present
  - _Requirements: 4.1–4.9_

- [ ]\* 3.1 Write property test for booking filter by customerId
  - **Feature: customer-features, Property 2: Booking filter — only customer's bookings are shown**
  - _Requirements: 4.1_

- [ ]\* 3.2 Write property test for action button visibility logic
  - **Feature: customer-features, Property 3: Action button visibility is determined by booking status**
  - _Requirements: 4.4, 4.5, 4.6, 4.7, 4.8_

- [ ] 4. Verify `/dashboard/my-bookings/[id]` — single booking detail page
  - Confirm booking is fetched via `getBookingById(id)` and all fields render
  - Confirm `canPay` and `canCancel` logic matches design spec
  - _Requirements: 5.1–5.4_

- [ ] 5. Verify `/dashboard/my-bookings/[id]/payment` — payment page
  - Confirm booking summary renders (service image, title, date, slots, technician, amount)
  - Confirm guard conditions: already-paid shows "Payment Completed", cancelled shows "Booking Cancelled"
  - Confirm `StripeButton` calls `createPayment` then `createCheckoutSession` then `window.location.assign`
  - _Requirements: 7.1–7.7_

- [ ]\* 5.1 Write unit tests for payment page guard conditions
  - Edge case: `paymentStatus === 'COMPLETED'` renders "Payment Completed"
  - Edge case: `status === 'CANCELLED'` renders "Booking Cancelled"
  - _Requirements: 7.2, 7.3_

- [ ] 6. Checkpoint — ensure all tests pass, ask the user if questions arise.

- [ ] 7. Verify `/dashboard/my-bookings/[id]/leave-review` — review form
  - Confirm booking is fetched and all hidden fields pre-populated
  - Confirm `LeaveReviewForm` renders star rating and comment textarea
  - Confirm `leaveReview` is called with correct payload on submit
  - _Requirements: 10.1–10.7_

- [ ]\* 7.1 Write property test for review payload integrity
  - **Feature: customer-features, Property 6: Review payload integrity**
  - _Requirements: 10.4_

- [ ] 8. Verify `/dashboard/my-payments` — payment history
  - Confirm `getMyPayments` is called and all payment rows render the required fields
  - Confirm empty state renders when `payments.length === 0`
  - _Requirements: 9.1–9.4_

- [ ]\* 8.1 Write property test for payment row fields and status badges
  - **Feature: customer-features, Property 5: Payment row displays all required fields**
  - _Requirements: 9.2, 9.4_

- [ ] 9. Verify `/dashboard/reviews` — my reviews listing
  - Confirm `getAllReviews` is called and reviews render with technician name, star rating, date
  - Confirm empty state renders when list is empty
  - _Requirements: 11.1–11.3_

- [ ]\* 9.1 Write property test for reviews table
  - **Feature: customer-features, Property 7: Reviews table displays all reviews**
  - _Requirements: 11.1, 11.3_

- [ ] 10. Verify `/payment/success` and `/payment/cancel` pages
  - Confirm `/payment/success` shows success icon, confirmation message, and navigation buttons
  - Confirm `/payment/cancel` shows cancel icon, explanation, and navigation buttons
  - Both are under the public layout (no auth required)
  - _Requirements: 8.1, 8.2, 8.3_

- [ ] 11. Verify dashboard home `/dashboard` — stat cards
  - Confirm stat filtering logic (REQUESTED, IN_PROGRESS, COMPLETED, ACCEPTED counts + total spent)
  - Confirm "Browse Services" button is present
  - _Requirements: 1.1–1.4_

- [ ]\* 11.1 Write property test for booking stat calculations
  - **Feature: customer-features, Property 1: Booking stat counts are consistent with booking array**
  - _Requirements: 1.2_

- [ ] 12. Final checkpoint — ensure all tests pass, commit, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Task 1 (fix `updateTag` bug) is a blocking bug — must be done first
- Task 2 (booking-success page) is the only missing page — must be created
- Tasks 3–11 are verification tasks: read existing code, fix any gaps found, add tests
- All server actions already exist; no new API endpoints need to be created
