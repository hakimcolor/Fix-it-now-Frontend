"use server";

import { LoginFormData } from "@/schemas/login.schema";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";


export async function loginUser(data: LoginFormData) {
  // console.log("Login Request:", data);

//  Call backend API
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }

  if(result.success){
    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
    
    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
      // console.log(decodedToken, "decoded token")
    if(decodedToken.role === "CUSTOMER"){
      redirect("/dashboard");
    }else if(decodedToken.role === "ADMIN"){
      redirect("/admin-dashboard");
    }else if(decodedToken.role === "TECHNICIAN"){
      redirect("/technician-dashboard");
    }
  }

  return result;
}