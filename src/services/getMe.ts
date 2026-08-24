'use server';

import { cacheLife, cacheTag } from 'next/cache';
import { cookies } from 'next/headers';

async function fetchMe(accessToken: string) {
  'use cache';
  cacheLife('days');
  cacheTag('my-profile');

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });

  return res.json();
}

export const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      message: 'User not logged in!',
    };
  }

  return fetchMe(accessToken);
};
