'use server';

import { createBooking } from '@/app/(dashboard)/_actions/createBooking';

// Public-facing booking — re-exports the same createBooking action
export { createBooking as serviceBooking };
