'use server';

import { cookies } from 'next/headers';

export const getAllBookings = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) return { success: false, data: [], message: 'Unauthorized' };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Cookie: `accessToken=${accessToken}`,
        },
        cache: 'no-store',
      }
    );

    const result = await res.json();
    if (!res.ok) return { success: false, data: [], message: result.message };
    return result;
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return { success: false, message: 'Failed to fetch bookings.', data: [] };
  }
};
