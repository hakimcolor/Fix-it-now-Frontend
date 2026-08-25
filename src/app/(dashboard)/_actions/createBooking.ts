'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export interface CreateBookingPayload {
  serviceId: string;
  scheduledDate: string;
  timeSlot: string;
  contactNumber: string;
}

export async function createBooking(payload: CreateBookingPayload) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, message: 'Unauthorized. Please log in.' };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.message || 'Failed to create booking',
    };
  }

  revalidatePath('/dashboard/my-bookings');

  return {
    success: true,
    message: result.message || 'Booking created successfully',
    data: result.data,
  };
}
