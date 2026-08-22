"use server";

import { cookies } from "next/headers";

export interface CreateServicePayload {
  categoryId: string;
  title: string;
  description: string;
  price: number;
  priceType: "FIXED" | "HOURLY";
  estimatedDuration: number;
  thumbnail: string;
  isAvailable: boolean;
}

export async function createService(data: CreateServicePayload) {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Unauthorized");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to create service");
    }

    return result;
  } catch (error) {
    console.error("Create Service Error:", error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    };
  }
}