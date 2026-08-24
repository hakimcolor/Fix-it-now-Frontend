'use server';

import { updateTag } from 'next/cache';
import { cookies } from 'next/headers';

export interface UpdateTechnicianProfilePayload {
  bio?: string;
  skills?: string[];
  experience?: number;
  hourlyRate?: number;
  location?: string;
}

export async function updateTechnicianProfile(
  payload: UpdateTechnicianProfilePayload
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, message: 'Unauthorized' };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/technician/profile`,
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
      message: result.message || 'Failed to update profile',
    };
  }

  updateTag('my-profile');

  return {
    success: true,
    message: result.message || 'Profile updated successfully',
    data: result.data,
  };
}
