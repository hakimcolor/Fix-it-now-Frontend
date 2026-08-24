# Requirements: Customer Features

## Introduction

This spec covers the customer-facing features of the FixItNow platform. The goal is to deliver a complete, working customer experience: browsing services, booking a technician, paying via Stripe, viewing booking and payment history, and leaving reviews for completed bookings.

The codebase already has significant partial implementations. This spec describes **what must be built or fixed** to reach a fully working state.

---

## Glossary

- **Customer**: An authenticated user with role `CUSTOMER`.
- **Booking**: A service reservation created by a customer, managed via `POST /api/bookings/create`.
- **Booking Status**: One of `REQUESTED | ACCEPTED | DECLINED | PAID | IN_PROGRESS | COMPLETED | CANCELLED`.
- **Payment Status**: One of `PENDING | PAID | FAILED | CANCELLED`.
- **BookingSlot**: A time window offered by a technician for a service.
- **Review**: A rating + comment submitted by a customer for a completed booking.
- **Stripe Checkout**: The external payment gateway. After technician accepts, the customer pays via Stripe.
- **Dashboard**: The `/dashboard` route group, accessible only to `CUSTOMER` role.

---

## Requirements

### Requirement 1: Customer Dashboard Home

**User Story:** As a customer, I want a dashboard home page that shows me a summary of my activity, so that I can quickly see what's happening with my bookings and spending.

#### Acceptance Criteria

1. WHEN a customer visits `/dashboard`, THE Dashboard SHALL display a welcome message with the customer's name.
2. THE Dashboard SHALL show stat cards for: Total Bookings, Pending Bookings, Active Services, Completed Jobs, Total Spent, and Accepted Bookings.
3. WHEN stat data is loading or unavailable, THE Dashboard SHALL show a loading or fallback state without crashing.
4. THE Dashboard SHALL provide a "Browse Services" button linking to `/services`.

---

### Requirement 2: Booking Flow (Service → Slot Selection → Submit)

**User Story:** As a customer, I want to browse services, select an available time slot, add a note, and submit a booking, so that I can schedule home services.

#### Acceptance Criteria

1. WHEN a customer views a service detail page at `/services/[id]`, THE Page SHALL display available booking slots.
2. WHEN a customer clicks "Book This Service" without being authenticated, THE System SHALL redirect the customer to `/login?from=<current_path>`.
3. WHEN an authenticated customer opens the booking modal and selects a slot, THE Modal SHALL enable the "Continue" button.
4. WHEN a customer submits the booking, THE System SHALL call `POST /api/bookings/create` with `technicianId`, `serviceId`, `note`, and `bookingSlotIds`.
5. WHEN the booking is created successfully, THE System SHALL redirect the customer to `/dashboard/booking-success`.
6. WHEN the booking creation fails, THE System SHALL display a toast error with the server's error message.
7. IF a customer submits a booking without selecting a slot, THEN THE System SHALL keep the submit button disabled and prevent submission.

---

### Requirement 3: Booking Success Page

**User Story:** As a customer, I want a confirmation page after a successful booking, so that I know my booking was received.

#### Acceptance Criteria

1. WHEN a customer lands on `/dashboard/booking-success`, THE Page SHALL display a success message confirming the booking was created.
2. THE Page SHALL provide navigation links to "My Bookings" (`/dashboard/my-bookings`) and "Browse More Services" (`/services`).

---

### Requirement 4: My Bookings — History & Status

**User Story:** As a customer, I want to see all my bookings with their current status, so that I can track the progress of each service.

#### Acceptance Criteria

1. WHEN a customer visits `/dashboard/my-bookings`, THE Page SHALL fetch and display all bookings belonging to that customer via `GET /api/bookings?customerId=true`.
2. THE Page SHALL display each booking with: service thumbnail, service title, booking date, booking status badge, payment status badge, price, estimated duration.
3. WHEN no bookings exist, THE Page SHALL display an empty state with a link to browse services.
4. WHEN the booking status is `REQUESTED`, THE Page SHALL show a disabled "Waiting…" button.
5. WHEN the booking status is `ACCEPTED` and payment is not yet done, THE Page SHALL show a "Pay Now" button linking to `/dashboard/my-bookings/[id]/payment`.
6. WHEN the booking status is `COMPLETED`, THE Page SHALL show a "Leave Review" button linking to `/dashboard/my-bookings/[id]/leave-review`.
7. WHEN the booking status is `CANCELLED` or `DECLINED`, THE Page SHALL show a disabled status button.
8. WHEN the booking status is not `IN_PROGRESS`, `COMPLETED`, `CANCELLED`, or `DECLINED`, THE Page SHALL show a "Cancel Booking" button.
9. THE Page SHALL show a "View Details" button for every booking, linking to `/dashboard/my-bookings/[id]`.

---

### Requirement 5: Booking Detail Page

**User Story:** As a customer, I want to view the full details of a single booking, so that I understand what was booked and the current state.

#### Acceptance Criteria

1. WHEN a customer visits `/dashboard/my-bookings/[id]`, THE Page SHALL fetch the booking via `GET /api/bookings/:id` and display: service info (thumbnail, title, description, price), booking status, payment status, selected time slots, technician info (name, bio, phone, email), and customer note.
2. WHEN the booking allows payment (`paymentStatus === 'PENDING'` and `status !== 'CANCELLED'`), THE Page SHALL show a "Pay Now" button.
3. WHEN the booking can be cancelled (not `IN_PROGRESS`, `COMPLETED`, or `CANCELLED`), THE Page SHALL show the `CancelBookingButton`.
4. WHEN the booking is not found, THE Page SHALL show a "Not found" message.

---

### Requirement 6: Cancel Booking

**User Story:** As a customer, I want to cancel a booking that hasn't started yet, so that I can free my schedule if plans change.

#### Acceptance Criteria

1. WHEN a customer clicks "Cancel Booking", THE System SHALL show a confirmation dialog.
2. WHEN the customer confirms cancellation, THE System SHALL call `PATCH /api/bookings/:id/cancel`.
3. WHEN cancellation succeeds, THE System SHALL show a success toast and refresh the booking list.
4. WHEN cancellation fails, THE System SHALL show a descriptive error toast.

---

### Requirement 7: Payment Flow

**User Story:** As a customer, I want to pay for an accepted booking via Stripe, so that the technician can proceed with the service.

#### Acceptance Criteria

1. WHEN a customer visits `/dashboard/my-bookings/[id]/payment`, THE Page SHALL display a booking summary (service image, title, description, date, slots, technician name, total amount).
2. WHEN the booking is already paid (`paymentStatus === 'COMPLETED'`), THE Page SHALL show a "Payment Completed" message and prevent re-payment.
3. WHEN the booking is cancelled, THE Page SHALL show a "Booking Cancelled" message and prevent payment.
4. WHEN a customer clicks "Pay with Stripe", THE System SHALL call `POST /api/payments/create` with `{ bookingId, amount, method: 'CARD', provider: 'STRIPE', currency: 'USD' }`.
5. WHEN payment creation succeeds, THE System SHALL call `POST /api/payments/create` (checkout) with `{ bookingId }` to get the Stripe checkout URL.
6. WHEN the Stripe checkout URL is returned, THE System SHALL redirect the customer to that URL via `window.location.assign`.
7. WHEN any payment step fails, THE System SHALL display an error toast with the failure message.

---

### Requirement 8: Payment Success & Cancel Pages

**User Story:** As a customer, I want dedicated pages for payment outcomes, so that I know whether my payment succeeded or was cancelled.

#### Acceptance Criteria

1. THE Page at `/payment/success` SHALL display a success confirmation with: success icon, confirmation message, "What's Next" info, and buttons to "View My Bookings" and "View Payment History".
2. THE Page at `/payment/cancel` SHALL display a cancellation notice with: cancel icon, explanation, common reasons list, and buttons to return to bookings or browse services.
3. BOTH pages SHALL be accessible without authentication (public layout).

---

### Requirement 9: Payment History

**User Story:** As a customer, I want to view all my past payments, so that I can track my spending.

#### Acceptance Criteria

1. WHEN a customer visits `/dashboard/my-payments`, THE Page SHALL fetch payments via `GET /api/payments` and display them in a table.
2. THE Table SHALL show: row number, booking ID (truncated), amount with currency, provider, method, status badge, transaction ID or Stripe customer ID, and date.
3. WHEN there are no payments, THE Page SHALL show an empty state with a receipt icon and message.
4. THE Status badges SHALL visually distinguish `PAID`, `PENDING`, `FAILED`, and `CANCELLED` states.

---

### Requirement 10: Leave a Review

**User Story:** As a customer, I want to leave a star rating and comment for a completed booking, so that I can share my experience with the technician.

#### Acceptance Criteria

1. WHEN a customer visits `/dashboard/my-bookings/[id]/leave-review`, THE Page SHALL fetch the booking and pre-populate the hidden fields: `customerId`, `technicianId`, `bookingId`, `serviceId`.
2. THE Form SHALL allow a star rating from 1–5 with hover effects.
3. THE Form SHALL require a comment of at least 10 characters and at most 500 characters.
4. WHEN the customer submits the review, THE System SHALL call `POST /api/reviews` with the full review payload.
5. WHEN the review is submitted successfully, THE System SHALL show a success toast and redirect to `/dashboard/my-bookings`.
6. WHEN review submission fails, THE System SHALL show an error toast with the server message.
7. IF the booking is not found, THEN THE Page SHALL return a 404.

---

### Requirement 11: My Reviews Page

**User Story:** As a customer, I want to view all reviews I have submitted, so that I can see my feedback history.

#### Acceptance Criteria

1. WHEN a customer visits `/dashboard/reviews`, THE Page SHALL fetch reviews via `GET /api/reviews` and display them in a table.
2. THE Table SHALL show: technician avatar + name, service title (from `review.title`), star rating (1–5 visual), date, and a "Published" status badge.
3. WHEN there are no reviews, THE Page SHALL show an empty state message in the table.
