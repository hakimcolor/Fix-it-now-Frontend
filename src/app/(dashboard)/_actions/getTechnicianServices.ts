"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTechnicianServices = async (
  technicianId: string
) => {
  try {
        const cookieStore = await cookies();
    
        const accessToken = cookieStore.get("accessToken")?.value;
    const res = await fetch(
      `${API_URL}/api/services/technician/${technicianId}`,
      {
        method: "GET",
         headers: {
          "Content-Type": "application/json",
          ...(accessToken && {
            Authorization: `Bearer ${accessToken}`,
          }),
        },
        next: {
          tags: ["technician-services"],
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result?.message || "Failed to fetch technician services."
      );
    }

    return result;
  } catch (error) {
    console.error("Error fetching technician services:", error);

    return {
      success: false,
      data: [],
      message: "Something went wrong.",
    };
  }
};