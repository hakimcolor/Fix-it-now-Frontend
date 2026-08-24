# Implementation Plan: Authentication

## Overview

Most of the auth system is already implemented. The work is: verify and fix any gaps in existing server actions and pages, ensure the proxy covers all edge cases, and add tests. The base URL is used directly in all fetch calls (no `.env` for the API URL).

## Tasks

- [ ] 1. Verify and fix `registerUser` server action
  - Confirm `registerUser.ts` calls `POST https://fixit-now-backend.vercel.app/api/auth/register` with `{ name, email, password, role }`
  - Confirm it throws with the server's error message on failure (not a generic message)
  - _Requirements: 1.3, 1.5_

- [ ]\* 1.1 Write property test for register payload shape
  - **Property 1: Register payload contains all required fields**
  - **Validates: Requirements 1.3**

- [ ]\* 1.2 Write property test for register validation rejection
  - **Property 2: Register validation rejects incomplete inputs**
  - **Validates: Requirements 1.6**

- [ ] 2. Verify and fix `loginUser` server action
  - Confirm `loginUser.ts` calls `POST https://fixit-now-backend.vercel.app/api/auth/login` with `{ email, password }`
  - Confirm `accessToken` and `refreshToken` are stored as HTTP-only cookies on success
  - Confirm role-based redirect uses `jwt.decode` to extract role and maps to correct path
  - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.6_

- [ ]\* 2.1 Write property test for login payload shape
  - **Property 3: Login payload contains exactly email and password**
  - **Validates: Requirements 2.2**

- [ ]\* 2.2 Write property test for role-based redirect logic
  - **Property 4: Role-based redirect is deterministic**
  - Test the `ROLE_REDIRECTS` mapping for all three roles
  - **Validates: Requirements 2.4, 2.5, 2.6, 2.8**

- [ ] 3. Verify `getMe` service
  - Confirm `getMe.ts` calls `GET https://fixit-now-backend.vercel.app/api/auth/me` with the `accessToken` cookie
  - Confirm it returns `{ success: false }` when `accessToken` is absent (no API call made)
  - Confirm cache is tagged `'my-profile'` with `cacheLife('days')`
  - _Requirements: 3.1, 3.3, 3.4_

- [ ] 4. Verify `logout` service
  - Confirm `logout.ts` deletes both `accessToken` and `refreshToken` cookies
  - Confirm `revalidateTag('my-profile', 'max')` is called after cookie deletion
  - _Requirements: 4.2, 4.3_

- [ ] 5. Verify proxy route protection in `src/proxy.ts`
  - Confirm unauthenticated access to protected routes redirects to `/login?from=<path>`
  - Confirm role-mismatch cases (CUSTOMER→/admin-dashboard, TECHNICIAN→/dashboard, etc.) redirect to `/login`
  - Confirm public routes (`/`, `/services/*`, `/find-technicians/*`) are always allowed
  - Confirm auth routes (`/login`, `/register`) redirect authenticated users to their dashboard
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ]\* 5.1 Write property test for proxy guard logic
  - **Property 5: Proxy blocks wrong-role access deterministically**
  - Extract and test the pure routing logic as a function
  - **Validates: Requirements 5.1, 5.2, 5.3, 5.4**

- [ ] 6. Checkpoint — ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- All API base URLs are hardcoded directly (no `.env` for the API URL, only for JWT secret)
- The proxy logic is already well-implemented; task 5 is primarily a verification + test task
- Install fast-check before running property tests: `npm install --save-dev fast-check vitest`
