// 'use server'


// type BookingStatus =
//   | "REQUESTED"
//   | "ACCEPTED"
//   | "DECLINED"
//   | "PAID"
//   | "IN_PROGRESS"
//   | "COMPLETED"
//   | "CANCELLED";

// // Payload type
// interface UpdateBookingStatusPayload {
//   status: BookingStatus;
// }
// export async function updateBookingStatus(bookingId: string, payload: UpdateBookingStatusPayload) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings/${bookingId}`,
//     {
//       method: 'PATCH', 
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         status: payload.status,
//       }),
//     }
//   );

//   if (!res.ok) {
//     const error = await res.text();
//     throw new Error(`Failed to update booking: ${res.status} ${error}`);
//   }

//   return res.json();
// }






















"use server";

import { cookies } from "next/headers";

type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

interface UpdateBookingStatusPayload {
  status: BookingStatus;
}

export async function updateBookingStatus(
  bookingId: string,
  payload: UpdateBookingStatusPayload
) {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to update booking.");
  }
  return result;
}