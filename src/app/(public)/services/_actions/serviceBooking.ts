"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";



interface ServiceBookingPayload {
  serviceId: string;
  note: string;
  bookingSlotIds: string[];
}

export const serviceBooking = async ({
  serviceId,
  note,
  bookingSlotIds,
}: ServiceBookingPayload) => {
  const token = (await cookies()).get("accessToken")?.value;
  try {
    // 1. Get service details to retrieve technicianId
    // http://localhost:5000/api/services/2b15a4ad-0513-4a6c-bd5c-4cea3760799b
    const serviceRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services/${serviceId}`,
      {
        cache: "no-store",
      }
    );

    if (!serviceRes.ok) {
      throw new Error("Failed to fetch service.");
    }

    const service = await serviceRes.json();

    const technicianId = service.data.technicianId;

    if (!technicianId) {
      throw new Error("Technician not found.");
    }

    // 2. Create booking
    const bookingRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          technicianId,
          serviceId,
          note,
          bookingSlotIds,
        }),
      }
    );

    const result = await bookingRes.json();

    if (!bookingRes.ok) {
      throw new Error(result.message || "Booking failed.");
    }

    // revalidatePath("/booking");
   

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};