"use server";

import { cookies } from "next/headers";

export interface UpdateServicePayload {
    categoryId: string;
    serviceId: string;
    title: string;
    description: string;
    price: number;
    priceType: "FIXED" | "HOURLY";
    estimatedDuration: number;
    thumbnail: string;
    isAvailable: boolean;
}

export async function updateService(
    technicianId: string,
    payload: UpdateServicePayload
) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return {
                success: false,
                message: "Unauthorized. Please login again.",
            };
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/services/technician/${technicianId}/edit`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
                cache: "no-store",
            }
        );

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                statusCode: res.status,
                message: result.message || "Failed to update service.",
                errors: result,
            };
        }

        return result;
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Something went wrong.",
        };
    }
}
















