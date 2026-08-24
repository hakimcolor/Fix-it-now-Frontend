import { getAdminBookings } from '../../_actions/getAdminBookings';
import { getAdminPayments } from '../../_actions/getAdminPayments';
import { getAllUsers } from '../../_actions/getAllUsers';
import { Card, CardContent } from '@/components/ui/card';
import BookingStatusChart from '../../_components/BookingStatusChart';
import RevenueLineChart from '../../_components/RevenueLineChart';
import { TrendingUp, Users, CalendarCheck, CreditCard } from 'lucide-react';

export default async function AdminAnalyticsPage() {
  const [bookingsRes, paymentsRes, usersRes] = await Promise.all([
    getAdminBookings(),
    getAdminPayments(),
    getAllUsers(),
  ]);

  const bookings = bookingsRes?.data ?? [];
  const payments = paymentsRes?.data ?? [];
  const users = usersRes?.data ?? [];

  const totalRevenue = payments
    .filter((p) => p.status === 'PAID')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const completedBookings = bookings.filter(
    (b: { status: string }) => b.status === 'COMPLETED'
  ).length;

  const conversionRate =
    bookings.length > 0
      ? ((completedBookings / bookings.length) * 100).toFixed(1)
      : '0';

  const newUsersThisMonth = users.filter((u: { createdAt: string }) => {
    const created = new Date(u.createdAt);
    const now = new Date();
    return (
      created.getMonth() === now.getMonth() &&
      created.getFullYear() === now.getFullYear()
    );
  }).length;

  const stats = [
    {
      label: 'Total Revenue',
      value: `৳${totalRevenue.toLocaleString()}`,
      sub: 'From paid transactions',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Total Users',
      value: users.length,
      sub: `${newUsersThisMonth} joined this month`,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Total Bookings',
      value: bookings.length,
      sub: `${completedBookings} completed`,
      icon: CalendarCheck,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
    {
      label: 'Completion Rate',
      value: `${conversionRate}%`,
      sub: 'Bookings completed',
      icon: CreditCard,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Platform performance overview and insights.
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
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BookingStatusChart bookings={bookings} />
        <RevenueLineChart bookings={bookings} />
      </div>
    </div>
  );
}
