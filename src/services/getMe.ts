'use server';

import { cookies } from 'next/headers';

export const getMe = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return {
        success: false,
        message: 'User not logged in!',
        data: null,
      };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      return {
        success: false,
        message: 'Failed to load user profile.',
        data: null,
      };
    }

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || 'Failed to load user profile.',
        data: null,
      };
    }

    return result;
  } catch (error) {
    console.error('getMe error:', error);
    return {
      success: false,
      message: 'Failed to load user profile.',
      data: null,
    };
  }
};
