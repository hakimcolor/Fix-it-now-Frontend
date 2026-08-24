'use server';

import { cookies } from 'next/headers';

export interface AvailabilitySlotPayload {
  serviceId: string;
  date: string; // YYYY-MM-DD
  startsAt: string; // HH:mm
  endsAt: string; // HH:mm
  isAvailable: boolean;
  isBooked: boolean;
  note?: string;
  bookingDeadline: string; // YYYY-MM-DD
  maxBookings: number;
}

export async function updateAvailability(payload: AvailabilitySlotPayload) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, message: 'Unauthorized. Please log in again.' };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/technician/availability`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    }
  );

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.message || 'Failed to update availability.',
    };
  }

  return {
    success: true,
    message: result.message || 'Availability updated successfully.',
    data: result.data,
  };
}
