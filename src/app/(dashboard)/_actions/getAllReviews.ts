'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Review {
  id: string;
  customerId: string;
  technicianId: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  technician: {
    id: string;
    profilePhoto: string;
    user: {
      name: string;
      email: string;
    };
  };
}

export const getAllReviews = async (): Promise<Review[]> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const res = await fetch(`${API_URL}/api/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      cache: 'no-store',
    });

    if (!res.ok) return [];

    const result = await res.json();
    return result?.data ?? [];
  } catch {
    return [];
  }
};
