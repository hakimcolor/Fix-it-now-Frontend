# Design: Public Pages

## Overview

The FixItNow public pages are built under the `(public)` route group in the Next.js App Router. They are accessible to all visitors (authenticated or not) and include: the homepage, services listing with filtering and pagination, service detail, technicians listing, and public technician profile. Partial implementations already exist for all these pages.

Tech stack: Next.js 16.2.11, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Sonner, date-fns, Vitest + fast-check (testing).

---

## Architecture

```
(public) layout — Navbar + Footer, optional getMe() for auth context
├── /                            — Homepage
├── /services
│   ├── page.tsx                 — Services list + search + category filter
│   ├── [id]/page.tsx            — Service detail + BookingModal (authenticated customers)
│   └── _components/             — ServiceCard, ServiceFilters, ServicesList, Pagination, etc.
└── /find-technicians
    ├── page.tsx                 — All technicians list
    └── [id]/page.tsx            — Public technician profile
```

All data is fetched server-side via `'use server'` actions. No auth token is needed for any of these API calls.

---

## Components and Interfaces

### Existing components

- `ServiceCard` — displays service title, price, category, technician name
- `ServiceFilters` — category chip + keyword search filters
- `ServicesList` — renders a grid of `ServiceCard`s
- `ServicesSearchBar` — search input
- `Pagination` — page controls
- `BookingModal` — booking modal (authenticated customers only)
- `TopRatedTechnicians` — homepage section
- `FeaturedServices` — homepage section
- `PopularIndustries` — homepage section (categories)

### Server Actions (in `src/app/(public)/_actions/`)

| Action                          | URL                                                            | Purpose                      |
| ------------------------------- | -------------------------------------------------------------- | ---------------------------- |
| `getAllServices.ts`             | GET `https://fixit-now-backend.vercel.app/api/services`        | All services with pagination |
| `getAllCategories.ts`           | GET `https://fixit-now-backend.vercel.app/api/categories`      | All categories               |
| `getTechnicianById.ts` (public) | GET `https://fixit-now-backend.vercel.app/api/technicians/:id` | Single technician profile    |

Additional action needed:

- `getAllTechnicians.ts` (public) — GET `https://fixit-now-backend.vercel.app/api/technicians`

---

## Data Models

### Service

```ts
{
  id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;
  technicianProfileId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    description: string;
  }
  technicianProfile: {
    id: string;
    user: {
      name: string;
      email: string;
    }
  }
}
```

### Category (public)

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

### Technician (public list)

```ts
{
  id: string              // technicianProfileId
  userId: string
  bio: string | null
  skills: string[]
  experience: number
  hourlyRate: number
  location: string
  totalReviews: number
  averageRating: number
  availability: Record<string, string[]>
  isVerified: boolean
  user: { name: string; email: string; status: string }
}
```

### Filter Logic (pure functions, client-side)

```ts
// Category filter
const filterByCategory = (services: Service[], categoryId: string | null) =>
  categoryId ? services.filter((s) => s.categoryId === categoryId) : services;

// Keyword search
const filterByKeyword = (services: Service[], keyword: string) =>
  keyword
    ? services.filter(
        (s) =>
          s.title.toLowerCase().includes(keyword.toLowerCase()) ||
          s.description.toLowerCase().includes(keyword.toLowerCase())
      )
    : services;

// Pagination visibility
const showPagination = (total: number, limit: number) => total > limit;
```

---

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property-Based Testing Overview

Library: **fast-check** | Runner: **Vitest** | Minimum 100 iterations per test.
Tag format: `Feature: public-pages, Property N: <property_text>`

---

### Property 1: Homepage sections render all fetched items

_For any_ array of services, technicians, and categories, the count of rendered cards in each corresponding homepage section must equal the length of the respective input array.

**Validates: Requirements 1.2, 1.3, 1.4**

---

### Property 2: Category filter returns only matching services

_For any_ list of services and any category ID, applying the category filter must return only services where `service.categoryId === categoryId`, with no false inclusions or exclusions.

**Validates: Requirements 2.4**

---

### Property 3: Keyword search returns only matching services

_For any_ list of services and any non-empty keyword string, applying the keyword search filter must return only services where the title or description contains the keyword (case-insensitive), with no false inclusions or exclusions.

**Validates: Requirements 2.5**

---

### Property 4: Pagination is shown only when items exceed the limit

_For any_ total count and page limit, pagination controls are shown if and only if `total > limit`. When `total <= limit`, no pagination controls are rendered.

**Validates: Requirements 2.7**

---

### Property 5: Service detail page renders all required fields

_For any_ service object with id, title, description, price, category name, and technician name, the rendered service detail page must contain all six fields in the output.

**Validates: Requirements 3.1**

---

### Property 6: Technician card renders all required fields

_For any_ technician object, the rendered TechnicianCard must contain: the technician's name, location, hourly rate, average rating, total reviews, verification status, and skills list.

**Validates: Requirements 4.2**

---

### Property 7: Technician profile page renders all required fields

_For any_ technician profile object, the rendered profile page must contain: name, email, bio (or placeholder), skills list, experience, hourly rate, location, average rating, total reviews, verification status, and availability schedule.

**Validates: Requirements 5.1**

---

## Error Handling

| Scenario                                        | Behavior                                     |
| ----------------------------------------------- | -------------------------------------------- |
| `getAllServices` returns empty array            | Empty state message with "no services found" |
| Service not found by ID                         | `notFound()` — Next.js 404                   |
| Technician not found by ID                      | `notFound()` — Next.js 404                   |
| `getAllTechnicians` returns empty array         | Empty state message                          |
| Unauthenticated user clicks "Book This Service" | Redirect to `/login?from=/services/[id]`     |

---

## Testing Strategy

### Dual Testing Approach

- **Unit tests**: Verify redirect behavior for unauthenticated booking attempt, empty states, 404 cases
- **Property tests**: Verify filter logic, search logic, pagination logic, rendering completeness

### Test File Locations

```
src/app/(public)/__tests__/
  homepageSections.test.ts      — Property 1
  serviceFilter.test.ts         — Property 2, Property 3
  pagination.test.ts            — Property 4
  serviceDetail.test.ts         — Property 5
  technicianCard.test.ts        — Property 6
  technicianProfile.test.ts     — Property 7
```

Each test annotated with: `// Feature: public-pages, Property N: <text>`
Minimum 100 iterations via `fc.assert(fc.property(...), { numRuns: 100 })`.
