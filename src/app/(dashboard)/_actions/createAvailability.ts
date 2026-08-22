"use server";

import { cookies } from "next/headers";

export interface CreateAvailabilityPayload {
  serviceId: string;
  date: string;
  startsAt: string;
  endsAt: string;
  isAvailable: boolean;
  isBooked: boolean;
  note?: string;
  bookingDeadline: string;
  maxBookings: number;
}

export interface CreateAvailabilityResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export async function createAvailability(
  payload: CreateAvailabilityPayload
): Promise<CreateAvailabilityResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized. Please login again.",
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technician/availability`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to create availability.",
      };
    }

    return {
      success: true,
      message: result.message || "Availability created successfully.",
      data: result.data,
    };
  } catch (error) {
    console.error("Create Availability Error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}