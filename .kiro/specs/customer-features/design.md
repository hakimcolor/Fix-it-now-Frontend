# Design: Customer Features

## Overview

The FixItNow customer experience is built inside the Next.js App Router under the `(dashboard)` and `(public)` route groups. Most pages already exist with partial implementations. This design describes the complete target state, highlights gaps, and defines correctness properties to verify the implementation.

Tech stack in use: Next.js 16.2.11, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, React Hook Form + Zod, Sonner (toasts), date-fns.

---

## Architecture

```
(public) layout — Navbar + Footer, getMe() for auth context
├── /services/[id]         — Service detail + BookingModal
├── /payment/success       — Post-payment success page
└── /payment/cancel        — Post-payment cancel page

(dashboard) layout — DashboardSidebar + DashboardNavbar, role-guarded (CUSTOMER only)
├── /dashboard                          — Stats overview
├── /dashboard/booking-success          — Booking confirmation
├── /dashboard/my-bookings              — Booking history table
│   └── /[id]                           — Single booking detail
│       ├── /payment                    — Payment gateway selection
│       └── /leave-review               — Star rating + comment form
├── /dashboard/my-payments              — Payment history table
└── /dashboard/reviews                  — Submitted reviews list
```

All data fetching uses `'use server'` actions. Auth token is read from the `accessToken` cookie on every protected request. The proxy middleware (`src/proxy.ts`) enforces that only `CUSTOMER` role can access `/dashboard/*`.

---

## Components and Interfaces

### Existing components (already implemented, no changes needed)

- `CancelBookingButton` — AlertDialog wrapping `cancelBooking` server action
- `LeaveReviewForm` — star rating + comment form calling `leaveReview`
- `BookingModal` — slot picker + note textarea calling `serviceBooking`
- `DashboardSidebar` / `SidebarContent` — role-aware navigation
- `DashboardNavbar`

### Pages that exist and are substantially complete

- `/dashboard` — `CustomerDashboardHome` (stats cards)
- `/dashboard/my-bookings` — booking table with all action buttons
- `/dashboard/my-bookings/[id]` — booking detail
- `/dashboard/my-bookings/[id]/payment` — payment page with Stripe + SSLCommerz buttons
- `/dashboard/my-bookings/[id]/leave-review` — review submission
- `/dashboard/my-payments` — payment history table
- `/dashboard/reviews` — reviews table
- `/payment/success` — static success page
- `/payment/cancel` — static cancel page

### Gap: Booking Success Page

`/dashboard/booking-success` directory exists but has **no page.tsx**. This page is the redirect target after a successful booking. It must be created.

### Gap: `createBooking.ts` uses `updateTag` (non-existent API)

The `createBooking` action imports `updateTag` from `'next/cache'` which does not exist in Next.js 16. This must be replaced with `revalidateTag`.

---

## Data Models

### Booking (from API)

```ts
{
  id: string
  customerId: string
  technicianId: string
  serviceId: string
  bookingDate: string
  status: 'REQUESTED' | 'ACCEPTED' | 'DECLINED' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED'
  note: string | null
  service: { id, title, description, thumbnail, price, estimatedDuration }
  technician: { profilePhoto, bio, description, user: { name, phone, email } }
  customer: { name, email, phone }
  bookingSlots: BookingSlot[]
}
```

### Payment (from `getMyPayments.ts`)

```ts
{
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED';
  method: 'CARD' | 'CASH' | 'BANK_TRANSFER' | 'MOBILE_BANKING';
  provider: 'STRIPE' | 'SSLCOMMERZ';
  stripeCustomerId: string | null;
  transactionId: string | null;
  createdAt: string;
}
```

### Review (from `getAllReviews.ts`)

```ts
{
  id: string;
  customerId: string;
  technicianId: string;
  bookingId: string;
  rating: number; // 1–5
  comment: string;
  title: string;
  createdAt: string;
  technician: {
    id: string;
    profilePhoto: string;
    user: {
      (name, email, phone);
    }
  }
}
```

### Booking Action Button Logic

Given a booking, the displayed action buttons follow this pure logic:

```ts
// "Pay Now" is shown when:
status === 'ACCEPTED' && paymentStatus !== 'CANCELLED'

// "Leave Review" is shown when:
status === 'COMPLETED'

// "Cancel Booking" button is shown when:
!['IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DECLINED'].includes(status)

// Disabled status buttons:
status === 'REQUESTED'  → "Waiting…"
status === 'DECLINED'   → "Declined"
status === 'CANCELLED'  → "Cancelled"
status === 'IN_PROGRESS' → "In Progress"
```

---

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property-Based Testing Overview

Property-based testing (PBT) validates software correctness by testing universal properties across many generated inputs. The project uses **Vitest** (already in the JS ecosystem) with **fast-check** as the PBT library. Each property test runs a minimum of 100 iterations.

Tag format: `Feature: customer-features, Property N: <property_text>`

---

### Property 1: Booking stat counts are consistent with booking array

_For any_ array of bookings, the computed stat values (total, pending, active, completed, accepted) must equal the count of items matching each respective status filter.

- Total = `bookings.length`
- Pending = items with `status === 'REQUESTED'`
- Active = items with `status === 'IN_PROGRESS'`
- Completed = items with `status === 'COMPLETED'`
- Accepted = items with `status === 'ACCEPTED'`
- Total Spent = sum of `amount` for payments with `status === 'PAID'`

**Validates: Requirements 1.2**

---

### Property 2: Booking filter — only customer's bookings are shown

_For any_ list of bookings with mixed `customerId` values, filtering by a specific `customerId` should return only bookings where `booking.customerId === customerId`, with no false inclusions or exclusions.

**Validates: Requirements 4.1**

---

### Property 3: Action button visibility is determined by booking status

_For any_ booking status value, exactly the correct set of action elements is rendered:

- `ACCEPTED` + payment not cancelled → Pay Now button visible
- `COMPLETED` → Leave Review button visible
- `REQUESTED` / `DECLINED` / `CANCELLED` / `IN_PROGRESS` → only disabled status button
- Status not in `['IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DECLINED']` → Cancel button visible

**Validates: Requirements 4.4, 4.5, 4.6, 4.7, 4.8**

---

### Property 4: Booking payload contains required fields

_For any_ `serviceId`, `note`, and `bookingSlotIds` array, the payload forwarded to `POST /api/bookings/create` must contain exactly `technicianId` (fetched from service), `serviceId`, `note`, and `bookingSlotIds`.

**Validates: Requirements 2.4**

---

### Property 5: Payment row displays all required fields

_For any_ payment object, the rendered table row must contain the `bookingId` (truncated), `amount` with `currency`, `provider`, `method`, a status indicator corresponding to the payment's `status`, and the formatted `createdAt` date.

**Validates: Requirements 9.2, 9.4**

---

### Property 6: Review payload integrity

_For any_ valid `customerId`, `technicianId`, `bookingId`, `serviceId`, `rating` (1–5), and `comment` (10–500 chars), the `leaveReview` server action must forward the exact payload to `POST /api/reviews` with no field mutation.

**Validates: Requirements 10.4**

---

### Property 7: Reviews table displays all reviews

_For any_ non-empty array of reviews, the rendered table must have the same number of rows as reviews, and each row must contain the technician's name, a star rating matching `review.rating`, and the formatted `createdAt` date.

**Validates: Requirements 11.1, 11.3**

---

## Error Handling

| Scenario                                 | Behavior                                                       |
| ---------------------------------------- | -------------------------------------------------------------- |
| `getAllBookings` returns error           | Show empty state — page must not crash                         |
| `getMyPayments` throws                   | Caught with `.catch(() => ({ data: [] }))` — empty state shown |
| `cancelBooking` fails                    | Error toast with `result.message`                              |
| `createPayment` fails                    | Error toast, no redirect                                       |
| `createCheckoutSession` returns no URL   | Error toast: "Stripe checkout URL not found."                  |
| `leaveReview` fails                      | Error toast with `result.message`                              |
| Booking not found on detail/review pages | `notFound()` — Next.js 404                                     |

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are used. They are complementary:

- **Unit tests**: Verify specific examples, edge cases, and error conditions.
- **Property tests**: Verify universal properties across many generated inputs.

### Property-Based Testing

Library: **fast-check** (`npm install --save-dev fast-check`)
Runner: **Vitest**

Each property test:

- Runs minimum 100 iterations
- Is annotated with `// Feature: customer-features, Property N: <text>`
- References the specific requirements it validates

### Test File Locations

```
src/app/(dashboard)/__tests__/
  bookingStats.test.ts         — Property 1
  bookingFilter.test.ts        — Property 2
  bookingActions.test.ts       — Property 3
  paymentRow.test.ts           — Property 5
  reviewPayload.test.ts        — Property 6
  reviewsTable.test.ts         — Property 7

src/app/(public)/services/__tests__/
  bookingPayload.test.ts       — Property 4
```

### Unit Tests

- `booking-success` page renders expected elements
- Unauthenticated redirect behavior in `BookingModal`
- Empty state rendering for bookings and payments
- Edge cases: already-paid booking on payment page, cancelled booking on payment page
