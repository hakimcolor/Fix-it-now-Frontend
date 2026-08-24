'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export interface CreateServicePayload {
  title: string;
  description: string;
  price: number;
  categoryId: string;
}

export async function createService(data: CreateServicePayload) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, message: 'Unauthorized' };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(data),
    cache: 'no-store',
  });

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.message || 'Failed to create service',
    };
  }

  revalidatePath('/technician-dashboard/services');

  return {
    success: true,
    message: result.message || 'Service created successfully',
    data: result.data,
  };
}
