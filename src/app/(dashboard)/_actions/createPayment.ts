'use server';

import { cookies } from 'next/headers';

export async function createPayment(bookingId: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, message: 'Unauthorized', data: null };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/payments/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ bookingId }),
      cache: 'no-store',
    }
  );

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result?.message || 'Failed to create payment',
      data: null,
    };
  }

  return {
    success: true,
    message: result?.message || 'Payment created successfully',
    data: result?.data,
  };
}
