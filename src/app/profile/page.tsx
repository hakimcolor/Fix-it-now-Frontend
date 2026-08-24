import { redirect } from 'next/navigation';
import { getMe } from '@/services/getMe';

// /profile → redirects to the correct role-based profile page
export default async function ProfileRedirectPage() {
  const result = await getMe();

  if (!result?.success) {
    redirect('/login');
  }

  const role = result?.data?.role;

  if (role === 'ADMIN') redirect('/admin-dashboard');
  if (role === 'TECHNICIAN') redirect('/technician-dashboard/profile');

  // CUSTOMER or fallback
  redirect('/dashboard/profile');
}
