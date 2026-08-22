"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export interface Review {
//   id: string;
//   rating: number;
//   comment: string;
//   createdAt: string;

//   technician: {
//     id: string;
//     name: string;
//     profilePhoto: string | null;
//   };

//   booking: {
//     id: string;
//     service: {
//       id: string;
//       title: string;
//     };
//   };
// }

export interface Review {
  id: string;
  customerId: string;
  technicianId: string;
  bookingId: string;
  rating: number;
  comment: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  technician: {
    id: string;
    profilePhoto: string;
    user: {
      name: string;
      email: string;
      phone: string;
    };
  };
}


interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Review[];
}

export const getAllReviews = async (): Promise<Review[]> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_URL}/api/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
      },
      cache: "no-store",
    });

    const result: ApiResponse = await res.json();

    if (!res.ok || !result.success) {
      throw new Error(result.message || "Failed to fetch reviews");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};