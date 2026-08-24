'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export interface UpdateProfilePayload {
  name?: string;
  phone?: string;
  profilePhoto?: string;
}

export async function updateProfile(payload: UpdateProfilePayload) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, message: 'Unauthorized' };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/update-profile`,
    {
      method: 'PATCH',
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
      message: result.message || 'Failed to update profile',
    };
  }

  revalidateTag('my-profile');

  return {
    success: true,
    message: result.message || 'Profile updated',
    data: result.data,
  };
}
