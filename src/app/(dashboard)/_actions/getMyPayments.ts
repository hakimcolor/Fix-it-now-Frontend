"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: "PENDING" | "PAID" | "FAILED" | "CANCELLED";
  method: "CARD" | "CASH" | "BANK_TRANSFER" | "MOBILE_BANKING";
  provider: "STRIPE" | "SSLCOMMERZ";
  stripeCustomerId: string| null;
  transactionId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Payment[];
}

export async function getMyPayments(): Promise<ApiResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${API_URL}/api/payments`, {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch payments.");
  }

  return result;
}