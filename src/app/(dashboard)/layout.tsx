import { getMe } from '@/services/getMe';
import { cookies } from 'next/headers';
import DashboardNavbar from './_components/DashboardNavbar';
import DashboardSidebar from './_components/DashboardSidebar';

function decodeTokenRole(token: string): string | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const json = Buffer.from(payload, 'base64url').toString('utf-8');
    return JSON.parse(json)?.role ?? null;
  } catch {
    return null;
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();

  // If getMe failed or returned no role, decode it directly from the JWT
  if (!user?.data?.role) {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    const roleFromToken = token ? decodeTokenRole(token) : null;
    if (roleFromToken && user?.data) {
      user.data.role = roleFromToken as 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN';
    } else if (roleFromToken) {
      // getMe returned no data at all — build a minimal object
      Object.assign(user ?? {}, {
        data: {
          role: roleFromToken,
          name: '',
          email: '',
          id: '',
          createdAt: '',
          updatedAt: '',
        },
      });
    }
  }

  return (
    <div className="lg:flex min-h-screen">
      <DashboardSidebar user={user} />

      <main className="flex-1">
        <DashboardNavbar user={user} />

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
