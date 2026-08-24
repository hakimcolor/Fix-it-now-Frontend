import { Users, ShieldCheck, Wrench, UserX } from 'lucide-react';
import { getAllUsers } from '../../_actions/getAllUsers';
import { Card, CardContent } from '@/components/ui/card';
import AdminUsersClient from './AdminUsersClient';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER' | 'TECHNICIAN';
  status: 'ACTIVE' | 'BANNED';
  createdAt: string;
  updatedAt: string;
  technicianProfile?: {
    id: string;
    bio: string | null;
    skills: string[];
    experience: number;
    hourlyRate: number;
    location: string;
    totalReviews: number;
    averageRating: number;
    isVerified: boolean;
  };
}

export default async function AdminUserPage() {
  const result = await getAllUsers();
  const users: IUser[] = result.data ?? [];

  const stats = [
    {
      label: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Customers',
      value: users.filter((u) => u.role === 'CUSTOMER').length,
      icon: ShieldCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Technicians',
      value: users.filter((u) => u.role === 'TECHNICIAN').length,
      icon: Wrench,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
    {
      label: 'Banned',
      value: users.filter((u) => u.status === 'BANNED').length,
      icon: UserX,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Manage all customers, technicians and admins on the platform.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`rounded-xl p-3 ${s.bg}`}>
                  <Icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <AdminUsersClient users={users} />
    </div>
  );
}
