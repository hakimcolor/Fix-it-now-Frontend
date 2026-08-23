'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAdminBookings() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return { success: false, message: 'Unauthorized', data: [] };
    }

    const res = await fetch(`${API_URL}/api/admin/bookings`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || 'Failed to fetch bookings',
        data: [],
      };
    }

    return result;
  } catch (error) {
    console.error('Get Admin Bookings Error:', error);
    return { success: false, message: 'Something went wrong', data: [] };
  }
}
