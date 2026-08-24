# Design: Technician Dashboard

## Overview

The FixItNow technician dashboard is built inside the Next.js App Router under the `(dashboard)` route group, sharing the dashboard layout with the customer and admin dashboards. It is protected to `TECHNICIAN` role only via the proxy middleware. Partial implementations already exist for most pages.

Tech stack: Next.js 16.2.11, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, React Hook Form + Zod, Sonner (toasts), Vitest + fast-check (testing).

---

## Architecture

```
(dashboard) layout — DashboardSidebar + DashboardNavbar, role-guarded (TECHNICIAN only)
└── /technician-dashboard
    ├── page.tsx                              — Home + stat cards
    ├── /profile
    │   ├── page.tsx                          — View profile
    │   └── edit/page.tsx                     — Edit profile form
    ├── /availability
    │   └── page.tsx                          — Weekly availability scheduler
    ├── /services
    │   ├── page.tsx                          — My services list
    │   ├── create/page.tsx                   — Create service form
    │   └── [serviceId]
    │       ├── page.tsx                      — Service detail
    │       ├── edit/page.tsx                 — Edit service form
    │       └── slots/                        — Booking slot management (existing)
    ├── /bookings
    │   ├── page.tsx                          — All bookings with action buttons
    │   └── [id]/page.tsx                     — Booking detail
    └── /earnings
        └── page.tsx                          — Earnings summary
```

All data fetching uses `'use server'` actions. The `accessToken` cookie is forwarded on every request.

---

## Components and Interfaces

### Existing components

- `AvailabilityScheduler` — weekly availability slot picker
- `AvailabilityRules` — displays current availability
- `CreateServiceForm` — service creation form
- `UpdateServiceForm` — service edit form
- `DeleteServiceButton` — confirmation + delete action
- `BookingsTable` — generic bookings table
- `updateBookingStatusByTechnician` — client component with action buttons
- `WeeklySchedule` — displays weekly schedule
- `RevenueLineChart` — earnings chart

### Server Actions (in `src/app/(dashboard)/_actions/`)

| Action                          | Method + URL                        | Purpose                              |
| ------------------------------- | ----------------------------------- | ------------------------------------ |
| `getMyTechnicianProfile.ts`     | GET `/api/auth/me`                  | Fetch technician's own profile       |
| `updateTechnicianProfile.ts`    | PUT `/api/technician/profile`       | Update bio, skills, experience, etc. |
| `createAvailability.ts`         | POST `/api/technician/availability` | Create availability (first time)     |
| `updateAvailability.ts`         | PUT `/api/technician/availability`  | Update availability                  |
| `createService.ts`              | POST `/api/services`                | Create new service                   |
| `getTechnicianServices.ts`      | GET `/api/technician/services`      | Get technician's own services        |
| `getServiceById.ts`             | GET `/api/services/:id`             | Single service detail                |
| `updateService.ts`              | PATCH `/api/services/:id`           | Edit service                         |
| `deleteServiceByTechnician.ts`  | DELETE `/api/services/:id`          | Delete service                       |
| `getAllBookingsByTechnician.ts` | GET `/api/technician/bookings`      | All technician bookings              |
| `updateBookingStatus.ts`        | PATCH `/api/bookings/:id/status`    | Change booking status                |

---

## Data Models

### TechnicianProfile (from API)

```ts
{
  id: string
  userId: string
  bio: string | null
  skills: string[]
  experience: number       // years
  hourlyRate: number
  location: string
  totalReviews: number
  averageRating: number
  availability: Record<string, string[]>  // { "monday": ["09:00-12:00"] }
  isVerified: boolean
  createdAt: string
  updatedAt: string
  user: { name: string; email: string; status: string }
}
```

### Booking Status Action Logic (technician-side)

```ts
// For a given booking status, the available actions are:
// REQUESTED  → "Accept" + "Decline"
// ACCEPTED   → (waiting for customer payment, no technician action)
// PAID       → "Mark In Progress"
// IN_PROGRESS → "Mark Complete"
// COMPLETED  → (no actions)
// CANCELLED / DECLINED → (no actions)

const TECHNICIAN_STATUS_TRANSITIONS: Record<
  string,
  { label: string; next: string }[]
> = {
  REQUESTED: [
    { label: 'Accept', next: 'ACCEPTED' },
    { label: 'Decline', next: 'DECLINED' },
  ],
  PAID: [{ label: 'Mark In Progress', next: 'IN_PROGRESS' }],
  IN_PROGRESS: [{ label: 'Mark Complete', next: 'COMPLETED' }],
};
```

### Stat Computation Logic

```ts
// For any array of technician bookings:
const computeStats = (bookings: Booking[]) => ({
  total: bookings.length,
  pending: bookings.filter((b) => b.status === 'REQUESTED').length,
  accepted: bookings.filter((b) => b.status === 'ACCEPTED').length,
  completed: bookings.filter((b) => b.status === 'COMPLETED').length,
  earnings: bookings
    .filter((b) => b.status === 'COMPLETED')
    .reduce((sum, b) => sum + (b.service?.price ?? 0), 0),
});
```

---

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property-Based Testing Overview

Library: **fast-check** | Runner: **Vitest** | Minimum 100 iterations per test.
Tag format: `Feature: technician-dashboard, Property N: <property_text>`

---

### Property 1: Stat counts and earnings are consistent with the bookings array

_For any_ array of bookings, the computed stat values must satisfy:

- `total === bookings.length`
- `pending === count of REQUESTED bookings`
- `accepted === count of ACCEPTED bookings`
- `completed === count of COMPLETED bookings`
- `earnings === sum of service.price for all COMPLETED bookings`

**Validates: Requirements 1.2, 7.1**

---

### Property 2: Profile update payload contains exactly the required fields

_For any_ combination of bio (string), skills (string array), experience (number), hourlyRate (number), and location (string), the payload forwarded to `PUT /api/technician/profile` must contain exactly `{ bio, skills, experience, hourlyRate, location }` with no extra fields or mutations.

**Validates: Requirements 2.3**

---

### Property 3: Availability payload wraps the schedule correctly

_For any_ availability schedule object (mapping day names to time slot arrays), the payload forwarded to `PUT /api/technician/availability` must be `{ availability: <the schedule object> }` — wrapped exactly once with no mutation of the inner schedule.

**Validates: Requirements 3.3**

---

### Property 4: Service create payload contains exactly the required fields

_For any_ valid title, description, price, and categoryId, the payload forwarded to `POST /api/services` must contain exactly `{ title, description, price, categoryId }` with no extra or missing fields.

**Validates: Requirements 4.2**

---

### Property 5: Technician booking action buttons match booking status

_For any_ booking status value, the rendered action buttons must match the defined status transition map:

- `REQUESTED` → "Accept" and "Decline" buttons visible
- `PAID` → "Mark In Progress" button visible
- `IN_PROGRESS` → "Mark Complete" button visible
- `ACCEPTED`, `COMPLETED`, `CANCELLED`, `DECLINED` → no action buttons (or disabled state)

**Validates: Requirements 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9**

---

## Error Handling

| Scenario                                                            | Behavior                             |
| ------------------------------------------------------------------- | ------------------------------------ |
| `updateTechnicianProfile` fails                                     | Error toast with server message      |
| `updateAvailability` fails                                          | Error toast with server message      |
| `createService` fails                                               | Error toast with server message      |
| `updateService` fails                                               | Error toast with server message      |
| `deleteServiceByTechnician` fails                                   | Error toast, service remains in list |
| `updateBookingStatus` fails                                         | Error toast, status unchanged in UI  |
| `getAllBookingsByTechnician` throws                                 | Empty state shown, no crash          |
| Technician visits `/technician-dashboard` without `TECHNICIAN` role | Proxy redirects to `/login`          |

---

## Testing Strategy

### Dual Testing Approach

- **Unit tests**: Verify profile/service form error states, empty booking states, service detail rendering
- **Property tests**: Verify stat computations, payload shapes, availability wrapping, booking action buttons

### Test File Locations

```
src/app/(dashboard)/__tests__/
  technicianStats.test.ts          — Property 1
  technicianProfilePayload.test.ts — Property 2
  availabilityPayload.test.ts      — Property 3
  servicePayload.test.ts           — Property 4
  technicianBookingActions.test.ts — Property 5
```

Each test annotated with: `// Feature: technician-dashboard, Property N: <text>`
Minimum 100 iterations via `fc.assert(fc.property(...), { numRuns: 100 })`.
