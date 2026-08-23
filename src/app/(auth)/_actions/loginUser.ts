'use server';

import { LoginFormData } from '@/schemas/login.schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt, { JwtPayload } from 'jsonwebtoken';

type LoginResult = { success: false; message: string };

export async function loginUser(data: LoginFormData): Promise<LoginResult> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      cache: 'no-store',
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return { success: false, message: result.message || 'Login failed' };
  }

  if (result.success) {
    const cookieStore = await cookies();

    cookieStore.set('accessToken', result.data.accessToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
    });

    cookieStore.set('refreshToken', result.data.refreshToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
    });

    const decoded = jwt.decode(result.data.accessToken) as JwtPayload | null;
    const role =
      decoded?.role ??
      result.data?.user?.role ??
      result.data?.profile?.role ??
      result.data?.role;

    let redirectTo = '/';
    if (role === 'CUSTOMER') redirectTo = '/dashboard';
    else if (role === 'ADMIN') redirectTo = '/admin-dashboard';
    else if (role === 'TECHNICIAN') redirectTo = '/technician-dashboard';

    redirect(redirectTo);
  }

  return { success: false, message: 'Login failed. Please try again.' };
}
