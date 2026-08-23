'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAdminBookingById(id: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return { success: false, message: 'Unauthorized', data: null };
    }

    const res = await fetch(`${API_URL}/api/admin/bookings/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || 'Failed to fetch booking',
        data: null,
      };
    }

    return result;
  } catch (error) {
    console.error('Get Admin Booking By Id Error:', error);
    return { success: false, message: 'Something went wrong', data: null };
  }
}
