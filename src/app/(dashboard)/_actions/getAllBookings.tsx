"use server";

import { cookies } from "next/headers";

export const getAllBookings = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings?customerId=true`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    return result;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);

    return {
      success: false,
      message: "Failed to fetch bookings.",
      data: [],
    };
  }
};