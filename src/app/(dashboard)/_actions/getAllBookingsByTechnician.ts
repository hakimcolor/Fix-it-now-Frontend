'use server';

import { cookies } from 'next/headers';

export const getBookingsByTechnician = async () => {
  try {
    const token = (await cookies()).get('accessToken')?.value;

    if (!token) return { success: false, data: [] };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technician/bookings`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: `accessToken=${token}`,
        },
        cache: 'no-store',
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return { success: false, data: [] };
    }

    return result;
  } catch (error) {
    console.error('Error fetching technician bookings:', error);
    return { success: false, data: [] };
  }
};
