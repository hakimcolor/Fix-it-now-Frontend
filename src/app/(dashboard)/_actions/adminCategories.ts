'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  _count?: { services: number };
}

export async function getAdminCategories(): Promise<{
  success: boolean;
  message: string;
  data: Category[];
}> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const res = await fetch(`${API_URL}/api/admin/categories`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();
    if (!res.ok)
      return { success: false, message: result?.message || 'Failed', data: [] };
    return { success: true, message: result.message, data: result.data };
  } catch {
    return { success: false, message: 'Something went wrong', data: [] };
  }
}

export async function createCategory(payload: {
  name: string;
  description: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const res = await fetch(`${API_URL}/api/admin/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok)
      return {
        success: false,
        message: result?.message || 'Failed to create category',
      };

    revalidateTag('categories');
    return { success: true, message: result.message || 'Category created' };
  } catch {
    return { success: false, message: 'Something went wrong' };
  }
}
