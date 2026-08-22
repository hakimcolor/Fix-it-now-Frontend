"use server";

import { getMe } from "@/services/getMe";
import { cookies } from "next/headers";

export interface DeleteServicePayload {
    serviceId: string;
}

export async function deleteServiceByTechnician(
    payload: DeleteServicePayload
) {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        const me = await getMe();

        const technicianId = me.data?.profile?.technicianProfile?.id;

        if (!technicianId) {
            throw new Error("Technician profile not found.");
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/services/technician/${technicianId}/delete`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: accessToken ? `${accessToken}` : "",
                },
                body: JSON.stringify(payload),
                cache: "no-store",
            }
        );

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result?.message || "Failed to delete service.",
            };
        }

        return {
            success: true,
            message: result?.message || "Service deleted successfully.",
            data: result?.data,
        };
    } catch (error) {
        console.error("Delete Service Error:", error);

        return {
            success: false,
            message: "Something went wrong.",
        };
    }
}