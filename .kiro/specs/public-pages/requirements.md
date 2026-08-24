# Requirements: Public Pages

## Introduction

This spec covers the public-facing pages of the FixItNow platform. These pages are accessible without authentication and include: the homepage, services listing with filtering, individual service detail, all technicians listing, and individual technician profile. The public layout includes a shared Navbar and Footer.

---

## Glossary

- **Visitor**: Any user, authenticated or not, accessing a public route.
- **Service**: A service offering created by a technician, retrieved from `/api/services`.
- **Category**: A service category retrieved from `/api/categories`.
- **Technician**: A user with role `TECHNICIAN` whose profile is retrieved from `/api/technicians`.
- **Public_API**: The backend at `https://fixit-now-backend.vercel.app`.
- **ServiceCard**: A UI component that displays a single service's key details.
- **TechnicianCard**: A UI component that displays a single technician's key details.

---

## Requirements

### Requirement 1: Homepage

**User Story:** As a visitor, I want to see an engaging homepage that explains the platform and highlights services and technicians, so that I can understand what FixItNow offers.

#### Acceptance Criteria

1. WHEN a visitor navigates to `/`, THE Homepage SHALL display a hero section with a headline and a call-to-action linking to `/services`.
2. THE Homepage SHALL display a featured services section fetched from `GET https://fixit-now-backend.vercel.app/api/services`.
3. THE Homepage SHALL display a top-rated technicians section fetched from `GET https://fixit-now-backend.vercel.app/api/technicians`.
4. THE Homepage SHALL display a popular categories section fetched from `GET https://fixit-now-backend.vercel.app/api/categories`.
5. THE Homepage SHALL include a "How It Works" section and a platform statistics section.

---

### Requirement 2: All Services Page

**User Story:** As a visitor, I want to browse all available services and filter by category, price, or keyword, so that I can find the right service for my needs.

#### Acceptance Criteria

1. WHEN a visitor navigates to `/services`, THE ServicesPage SHALL fetch services from `GET https://fixit-now-backend.vercel.app/api/services` and display them as cards.
2. THE ServicesPage SHALL display a search bar allowing visitors to filter services by keyword.
3. THE ServicesPage SHALL display category filter chips fetched from `GET https://fixit-now-backend.vercel.app/api/categories`.
4. WHEN a visitor selects a category filter, THE ServicesPage SHALL display only services belonging to that category.
5. WHEN a visitor types in the search bar, THE ServicesPage SHALL display only services whose title or description matches the keyword.
6. WHEN no services match the active filters, THE ServicesPage SHALL display an empty state message.
7. THE ServicesPage SHALL display pagination controls when the total number of services exceeds the page limit.
8. WHEN a visitor clicks a service card, THE System SHALL navigate to `/services/[id]`.

---

### Requirement 3: Service Detail Page

**User Story:** As a visitor, I want to view the full details of a service, so that I can decide whether to book it.

#### Acceptance Criteria

1. WHEN a visitor navigates to `/services/[id]`, THE ServiceDetailPage SHALL fetch the service via `GET https://fixit-now-backend.vercel.app/api/services/:id` and display: title, description, price, category name, and technician information (name, email).
2. THE ServiceDetailPage SHALL display available booking slots for the service.
3. WHEN a visitor clicks "Book This Service" without being authenticated, THE System SHALL redirect to `/login?from=/services/[id]`.
4. WHEN an authenticated `CUSTOMER` clicks "Book This Service", THE System SHALL open the booking modal.
5. WHEN the service is not found, THE ServiceDetailPage SHALL show a "Not found" message.

---

### Requirement 4: All Technicians Page

**User Story:** As a visitor, I want to browse all technicians on the platform, so that I can find and contact a skilled professional.

#### Acceptance Criteria

1. WHEN a visitor navigates to `/find-technicians`, THE TechniciansPage SHALL fetch technicians from `GET https://fixit-now-backend.vercel.app/api/technicians` and display them as cards.
2. THE TechnicianCard SHALL display: technician name, email, location, hourly rate, average rating, total reviews, verification status, and skills list.
3. WHEN a visitor clicks a technician card, THE System SHALL navigate to `/find-technicians/[id]`.
4. WHEN there are no technicians, THE TechniciansPage SHALL display an empty state message.

---

### Requirement 5: Technician Profile Page (Public)

**User Story:** As a visitor, I want to view a technician's full public profile, so that I can assess their skills and experience before booking.

#### Acceptance Criteria

1. WHEN a visitor navigates to `/find-technicians/[id]`, THE TechnicianProfilePage SHALL fetch the technician via `GET https://fixit-now-backend.vercel.app/api/technicians/:id` and display: name, email, bio, skills, experience (years), hourly rate, location, average rating, total reviews, verification status, and availability schedule.
2. THE TechnicianProfilePage SHALL display all services offered by the technician.
3. WHEN the technician is not found, THE TechnicianProfilePage SHALL show a "Not found" message.
