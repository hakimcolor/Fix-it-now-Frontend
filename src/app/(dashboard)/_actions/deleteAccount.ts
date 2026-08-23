'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function deleteAccount() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, message: 'Unauthorized' };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/delete-account`,
    {
      method: 'DELETE',
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
      message: result.message || 'Failed to delete account',
    };
  }

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  redirect('/');
}
