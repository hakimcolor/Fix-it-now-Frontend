# Implementation Plan: Public Pages

## Overview

Partial implementations exist for all public pages. The work is: verify each page calls the correct API, wire up filtering and search logic, create a missing public `getAllTechnicians` action, and add tests. All API calls use direct URLs with no auth token.

## Tasks

- [ ] 1. Create public `getAllTechnicians` server action
  - Create `src/app/(public)/_actions/getAllTechnicians.ts`
  - Call `GET https://fixit-now-backend.vercel.app/api/technicians` (no auth required)
  - Return `{ success, data, meta }` matching the technicians API response shape
  - _Requirements: 4.1_

- [ ] 2. Verify homepage sections
  - Confirm `src/app/(public)/page.tsx` fetches from `/api/services`, `/api/technicians`, and `/api/categories`
  - Confirm `FeaturedServices`, `TopRatedTechnicians`, and `PopularIndustries` receive and render the fetched data
  - Confirm hero section has a CTA linking to `/services`
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ]\* 2.1 Write property test for homepage sections rendering
  - **Property 1: Homepage sections render all fetched items**
  - **Validates: Requirements 1.2, 1.3, 1.4**

- [ ] 3. Verify and fix services list page with filtering
  - Confirm `src/app/(public)/services/page.tsx` fetches from `getAllServices` and passes data to `ServicesList`
  - Implement or verify `filterByCategory` and `filterByKeyword` pure functions in `ServiceFilters` or a shared util
  - Confirm `ServiceFilters` fetches categories from `getAllCategories` for the category chips
  - Confirm `Pagination` component is shown only when `meta.total > meta.limit`
  - Confirm empty state when no services match filters
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [ ]\* 3.1 Write property test for category filter
  - **Property 2: Category filter returns only matching services**
  - **Validates: Requirements 2.4**

- [ ]\* 3.2 Write property test for keyword search filter
  - **Property 3: Keyword search returns only matching services**
  - **Validates: Requirements 2.5**

- [ ]\* 3.3 Write property test for pagination visibility
  - **Property 4: Pagination is shown only when items exceed the limit**
  - **Validates: Requirements 2.7**

- [ ] 4. Checkpoint — ensure all tests pass, ask the user if questions arise.

- [ ] 5. Verify service detail page
  - Confirm `src/app/(public)/services/[id]/page.tsx` fetches via `GET /api/services/:id`
  - Confirm all required fields render: title, description, price, category name, technician name
  - Confirm unauthenticated user clicking "Book This Service" is redirected to `/login?from=/services/[id]`
  - Confirm authenticated `CUSTOMER` opens the `BookingModal`
  - Confirm `notFound()` is called when service is not found
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ]\* 5.1 Write property test for service detail rendering
  - **Property 5: Service detail page renders all required fields**
  - **Validates: Requirements 3.1**

- [ ] 6. Build and verify all technicians page
  - Update `src/app/(public)/find-technicians/page.tsx` to fetch from `getAllTechnicians`
  - Render a grid of `TechnicianCard` components with all required fields
  - Show empty state when no technicians are returned
  - Wire up "View Profile" link to `/find-technicians/[id]`
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ]\* 6.1 Write property test for technician card rendering
  - **Property 6: Technician card renders all required fields**
  - **Validates: Requirements 4.2**

- [ ] 7. Verify public technician profile page
  - Confirm `src/app/(public)/find-technicians/[id]/page.tsx` fetches via `GET /api/technicians/:id`
  - Confirm all required fields render: name, email, bio, skills, experience, hourlyRate, location, averageRating, totalReviews, isVerified, availability
  - Confirm the page displays the technician's services
  - Confirm `notFound()` is called when technician is not found
  - _Requirements: 5.1, 5.2, 5.3_

- [ ]\* 7.1 Write property test for technician profile rendering
  - **Property 7: Technician profile page renders all required fields**
  - **Validates: Requirements 5.1**

- [ ] 8. Final checkpoint — ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Task 1 (create `getAllTechnicians` action) is the only new file that must be created
- The filter/search logic (`filterByCategory`, `filterByKeyword`) should be extracted as pure functions for easy testing
- Install fast-check before running property tests: `npm install --save-dev fast-check vitest`
