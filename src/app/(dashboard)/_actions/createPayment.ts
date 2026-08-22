"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CreatePaymentPayload {
  bookingId: string;
  amount: number;
  method: "CARD" | "CASH" | "BANK_TRANSFER" | "MOBILE_BANKING";
  provider: "STRIPE" | "SSLCOMMERZ";
  currency: string;
}

export const createPayment = async (
  payload: CreatePaymentPayload
) => {
    // console.log(payload, "from server action payload")
    
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_URL}/api/payments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = await res.json();
    // console.log(result, "after subbmittion in database")

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to create payment",
        data: null,
      };
    }

    // console.log(result?.data, "from crate payment action")
    return {
      success: true,
      message: result?.message || "Payment created successfully",
      data: result?.data,
    };
  } catch (error) {
    console.error("Create Payment Error:", error);

    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
};