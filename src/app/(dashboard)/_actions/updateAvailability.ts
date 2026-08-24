'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export type WeeklyAvailability = {
  monday?: string[];
  tuesday?: string[];
  wednesday?: string[];
  thursday?: string[];
  friday?: string[];
  saturday?: string[];
  sunday?: string[];
};

export async function updateAvailability(availability: WeeklyAvailability) {
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
      body: JSON.stringify({ availability }),
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

  revalidatePath('/technician-dashboard/availability');

  return {
    success: true,
    message: result.message || 'Availability updated successfully.',
    data: result.data,
  };
}
