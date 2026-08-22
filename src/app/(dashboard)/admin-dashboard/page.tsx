import { Users, Wrench, CalendarCheck, DollarSign } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import BookingStatusChart from '../_components/BookingStatusChart';
import RevenueLineChart from '../_components/RevenueLineChart';
import { getAllUsers } from '../_actions/getAllUsers';
import { getAllBookings } from '../_actions/getAllBookings';
import { getAllTechnicians } from '../_actions/getAllTechnicians';

export default async function AdminDashboardHome() {
  const [usersRes, bookingsRes, techniciansRes] = await Promise.all([
    getAllUsers(),
    getAllBookings(),
    getAllTechnicians({ limit: 1000 }),
  ]);

  const users = usersRes.data ?? [];
  const bookings = bookingsRes.data ?? [];
  const technicians = techniciansRes.data ?? [];

  const totalRevenue = bookings
    .filter(
      (b: { paymentStatus: string }) =>
        b.paymentStatus === 'PAID' || b.paymentStatus === 'COMPLETED'
    )
    .reduce(
      (sum: number, b: { service?: { price?: number } }) =>
        sum + (Number(b.service?.price) || 0),
      0
    );

  const stats = [
    { title: 'Total Users', value: users.length, icon: Users },
    { title: 'Total Bookings', value: bookings.length, icon: CalendarCheck },
    { title: 'Active Technicians', value: technicians.length, icon: Wrench },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor users, bookings, services and platform performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h2 className="text-3xl font-bold">{stat.value}</h2>
              </div>
              <stat.icon className="h-10 w-10 text-primary" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BookingStatusChart />
        <RevenueLineChart />
      </div>
    </div>
  );
}
