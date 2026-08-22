"use server";

import { cookies } from "next/headers";
import { ActiveStatus } from "../_components/UserActionsInAdmindeshboard";

export async function updateUserStatusByAdmin(userId: string, status: ActiveStatus) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
      },
      body: JSON.stringify({
        userStatus: status,
      }),
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to update user status: ${res.status} ${error}`);
  }

  return res.json();
}