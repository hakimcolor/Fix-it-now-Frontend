"use server";

import { cookies } from "next/headers";

export const getMe = async ()=>{
    const cookieStore = await cookies();


    const accessToken = cookieStore.get("accessToken")?.value;

    // console.log(accessToken)

    if(!accessToken){
        // throw new Error("User Not Logged In!")

        return{
            success: false,
            message: "User not logged in!"
        }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        headers: {
            // Authorization: `Bearer ${accessToken}`
            // Authorization: `${accessToken}`
            Cookie: `accessToken=${accessToken}`
        },
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 24, //1 day
            tags: ["my-profile"]
        }
        
    });

    const result = res.json();
    // console.log(result)
    return result;

}