'use server';

import { cookies } from 'next/headers';

// GET /api/technician/services — returns the logged-in technician's own services
export const getTechnicianServices = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technician/services`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        data: [],
        message: result?.message || 'Failed to fetch services.',
      };
    }

    return result;
  } catch (error) {
    console.error('getTechnicianServices error:', error);
    return { success: false, data: [], message: 'Something went wrong.' };
  }
};
