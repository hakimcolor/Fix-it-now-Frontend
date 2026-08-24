'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function updateCategory(
  id: string,
  payload: { name?: string; description?: string }
): Promise<{ success: boolean; message: string }> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const res = await fetch(`${API_URL}/api/admin/categories/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok) {
      return { success: false, message: result?.message || 'Failed to update' };
    }

    revalidateTag('categories');
    return { success: true, message: result.message || 'Category updated' };
  } catch {
    return { success: false, message: 'Something went wrong' };
  }
}

export async function deleteCategory(
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const res = await fetch(`${API_URL}/api/admin/categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const result = await res.json();
    if (!res.ok) {
      return { success: false, message: result?.message || 'Failed to delete' };
    }

    updateTag('categories');
    return { success: true, message: result.message || 'Category deleted' };
  } catch {
    return { success: false, message: 'Something went wrong' };
  }
}
