// "use server";

// import { cookies } from "next/headers";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export const getAllBookingsByTechnician = async () => {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("accessToken")?.value;

//     const res = await fetch(`${API_URL}/api/bookings`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//     });

//     const result = await res.json();

//     if (!res.ok) {
//       throw new Error(result?.message || "Failed to fetch bookings");
//     }

//     return result;
//   } catch (error) {
//     console.error("Get All Bookings Error:", error);

//     return {
//       success: false,
//       statusCode: 500,
//       message:
//         error instanceof Error ? error.message : "Something went wrong",
//       data: [],
//     };
//   }
// };

'use server';

import { cookies } from 'next/headers';

export const getBookingsByTechnician = async () => {
  try {
    const token = (await cookies()).get('accessToken')?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bookings?technicianId=true`,
      {
        method: 'GET',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        cache: 'no-store',
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || 'Failed to fetch bookings.');
    }

    return result;
  } catch (error) {
    console.error('Error fetching technician bookings:', error);
    return { success: false, data: [] };
  }
};
