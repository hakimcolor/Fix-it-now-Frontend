'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function updateUserStatusByAdmin(
  userId: string,
  status: 'ACTIVE' | 'BANNED'
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to update user status: ${res.status} ${error}`);
  }

  revalidatePath('/admin-dashboard/users');
  return res.json();
}
