'use server';

import { cookies } from 'next/headers';

export async function getMyServices() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, data: [], message: 'Unauthorized' };
  }

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
      message: result.message || 'Failed to fetch services',
    };
  }

  return result;
}
