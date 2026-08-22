'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const logout = async () => {
  const cookieStore = await cookies();

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  // two-arg form is required in this Next.js version; single-arg is deprecated
  revalidateTag('my-profile', 'max');
};
