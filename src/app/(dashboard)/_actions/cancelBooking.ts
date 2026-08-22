'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function cancelBooking(bookingId: string) {
  const token = (await cookies()).get('accessToken')?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'CANCELLED' }),
      cache: 'no-store',
    }
  );

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.message || 'Failed to cancel booking.',
    };
  }

  revalidatePath('/dashboard/my-bookings');
  return { success: true, message: 'Booking cancelled.' };
}
