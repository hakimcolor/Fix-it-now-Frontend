'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CreateReviewPayload {
  bookingId: string;
  rating: number;
  comment: string;
}

export async function leaveReview(
  payload: CreateReviewPayload
): Promise<{ success: boolean; message: string }> {
  try {
    const token = (await cookies()).get('accessToken')?.value;
    if (!token) return { success: false, message: 'Not authorized.' };

    const res = await fetch(`${API_URL}/api/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Cookie: `accessToken=${token}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const result = await res.json();
    if (!res.ok)
      return {
        success: false,
        message: result.message || 'Failed to submit review.',
      };

    revalidatePath('/dashboard/my-bookings');
    revalidatePath('/dashboard/reviews');
    return { success: true, message: result.message || 'Review submitted!' };
  } catch {
    return { success: false, message: 'Something went wrong.' };
  }
}
