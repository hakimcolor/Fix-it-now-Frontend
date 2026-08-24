'use server';

import { cookies } from 'next/headers';
import { createBooking } from '@/app/(dashboard)/_actions/createBooking';

// Public-facing booking — uses the same createBooking action
// Payload: { serviceId, scheduledDate, timeSlot, contactNumber }
export { createBooking as serviceBooking };
