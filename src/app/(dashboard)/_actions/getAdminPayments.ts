'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface AdminPayment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED';
  method: 'CARD' | 'CASH' | 'BANK_TRANSFER' | 'MOBILE_BANKING';
  provider: 'STRIPE' | 'SSLCOMMERZ';
  stripeCustomerId: string | null;
  transactionId: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function getAdminPayments(): Promise<{
  success: boolean;
  message: string;
  data: AdminPayment[];
}> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return { success: false, message: 'Unauthorized', data: [] };
    }

    const res = await fetch(`${API_URL}/api/admin/payments`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || 'Failed to fetch payments',
        data: [],
      };
    }

    return result;
  } catch (error) {
    console.error('Get Admin Payments Error:', error);
    return { success: false, message: 'Something went wrong', data: [] };
  }
}
