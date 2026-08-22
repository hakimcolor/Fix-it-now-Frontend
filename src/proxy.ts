import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from './utils/jwt';
import { cookies } from 'next/headers';
import { GetNewAccessToken } from './services/refreshToken';


const AUTH_ROUTES =["/login", "/register"]
const PUBLIC_ROUTES = ["/", "/browse-services", "/find-technicians", "/how-it-works"]
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname; 

  const cookieStore = await cookies();



let accessToken = request.cookies.get("accessToken")?.value;
const refreshToken = request.cookies.get("refreshToken")?.value;


let decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null; 
const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null; 

if(!decodedAccessToken?.success && decodedRefreshToken?.success){
  // access token has expired but refresh token is valid. get new access token from backend
  const result = await GetNewAccessToken();

  // console.log(result)

  if(result.success){
    const newAccessToken = result.data?.accessToken;
    cookieStore.set("accessToken", newAccessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    })

    accessToken = newAccessToken;
    decodedAccessToken = jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET as string);
  }
}

let userRole = null;

if(!decodedAccessToken?.success){
  // token has expired or is invalid, clear the cookies
  cookieStore.delete("accessToken");
 
}

if(decodedAccessToken?.success && decodedAccessToken.data){
  userRole = (decodedAccessToken.data as JwtPayload).role;
}

// user in logged in and trying to access login or register page, redirect to dashboard or root home page
if(accessToken && AUTH_ROUTES.includes(pathname)){
  if(userRole === "CUSTOMER"){
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }else if(userRole === "ADMIN"){
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }else if(userRole === "TECHNICIAN"){
    return NextResponse.redirect(new URL("/technician-dashboard", request.url));
  }else{
    return NextResponse.redirect(new URL("/", request.url));
  }
}


const isPublicRoutes = PUBLIC_ROUTES.some((route)=> pathname === route || pathname.startsWith(route + "/"));
const isAuthRoutes = AUTH_ROUTES.some((route)=> pathname === route || pathname.startsWith(route + "/"));


// Authenticated Pages Protection : Authorization is not handle yet.
if(!accessToken && !isPublicRoutes && !isAuthRoutes){
  return NextResponse.redirect(new URL("/login", request.url));
}

// Authorization: Role based access control
if(pathname.startsWith("/customer-dashboard") && userRole !== "CUSTOMER"){
  return NextResponse.redirect(new URL("/not-found", request.url));
}else if(pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN"){
  return NextResponse.redirect(new URL("/not-found", request.url));
}else if(pathname.startsWith("/technician-dashboard") && userRole !== "TECHNICIAN"){
  return NextResponse.redirect(new URL("/not-found", request.url));
} 
return NextResponse.next();

}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
    matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)',
  ],
}