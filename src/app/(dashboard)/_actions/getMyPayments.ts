'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  transactionId: string;
  provider: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  stripeCheckoutSessionId?: string | null;
  paidAt?: string | null;
  createdAt: string;
  updatedAt: string;
  booking?: {
    id: string;
    scheduledDate: string;
    timeSlot: string;
    status: string;
    service?: { title: string; price: number };
  };
}

interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Payment[];
}

export async function getMyPayments(): Promise<ApiResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const res = await fetch(`${API_URL}/api/payments`, {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
    cache: 'no-store',
  });

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      statusCode: res.status,
      message: result.message || 'Failed to fetch payments.',
      data: [],
    };
  }

  return result;
}
