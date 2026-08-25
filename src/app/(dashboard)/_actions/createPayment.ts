'use server';

import { cookies } from 'next/headers';

export async function createPayment(bookingId: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      message: 'Not authorized. Please log in.',
      data: null,
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://fix-it-now-frontend-rosy.vercel.app';

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/payments/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({
        bookingId,
        successUrl: `${baseUrl}/payment/success?bookingId=${bookingId}`,
        cancelUrl: `${baseUrl}/payment/cancel?bookingId=${bookingId}`,
      }),
      cache: 'no-store',
    }
  );

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result?.message || 'Failed to initiate payment.',
      data: null,
    };
  }

  // Backend may return paymentUrl or url
  const paymentUrl =
    result?.data?.paymentUrl ??
    result?.data?.url ??
    result?.data?.checkoutUrl ??
    null;

  return {
    success: true,
    message: result?.message || 'Payment initiated.',
    data: { ...result?.data, paymentUrl },
  };
}
