import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  Star,
  Wrench,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { getBookingsByTechnician } from '../_actions/getAllBookingsByTechnician';
import { getMyServices } from '../_actions/getMyServices';
import { getMe } from '@/services/getMe';
import { bookingStatusConfig } from '../dashboard/my-bookings/config/bookingStatusConfig';

export default async function TechnicianDashboardPage() {
  const [meRes, bookingsRes, servicesRes] = await Promise.all([
    getMe(),
    getBookingsByTechnician(),
    getMyServices(),
  ]);

  const userName: string = meRes?.data?.name ?? 'Technician';

  const bookings: {
    id: string;
    status: string;
    service?: { price?: number; title?: string };
    customer?: { name?: string; email?: string };
    bookingDate?: string;
    paymentStatus?: string;
  }[] = bookingsRes?.data ?? [];

  const services: {
    id: string;
    title: string;
    price: number;
    category?: { name: string };
  }[] = servicesRes?.data ?? [];

  const totalEarnings = bookings
    .filter((b) => b.status === 'COMPLETED')
    .reduce((sum, b) => sum + (Number(b.service?.price) || 0), 0);

  const stats = [
    {
      title: 'Total Services',
      value: servicesRes?.meta?.total ?? services.length,
      icon: Wrench,
      description: 'Services you offer',
    },
    {
      title: 'Total Bookings',
      value: bookings.length,
      icon: CalendarDays,
      description: 'All time',
    },
    {
      title: 'Pending Requests',
      value: bookings.filter((b) => b.status === 'REQUESTED').length,
      icon: Clock3,
      description: 'Awaiting your response',
    },
    {
      title: 'Completed Jobs',
      value: bookings.filter((b) => b.status === 'COMPLETED').length,
      icon: CheckCircle2,
      description: 'Successfully finished',
    },
    {
      title: 'In Progress',
      value: bookings.filter((b) => b.status === 'IN_PROGRESS').length,
      icon: Star,
      description: 'Currently active',
    },
    {
      title: 'Total Earnings',
      value: `৳${totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      description: 'From completed jobs',
    },
  ];

  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {userName} 👋
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your work.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{item.value}</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Your latest booking requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground h-24"
                  >
                    No bookings yet.
                  </TableCell>
                </TableRow>
              ) : (
                recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <p className="font-medium">
                        {booking.customer?.name ?? '—'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {booking.customer?.email}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm">
                      {booking.service?.title ?? '—'}
                    </TableCell>
                    <TableCell>
                      {booking.bookingDate
                        ? new Date(booking.bookingDate).toLocaleDateString()
                        : '—'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          bookingStatusConfig[
                            booking.status as keyof typeof bookingStatusConfig
                          ]?.className
                        }
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{booking.paymentStatus}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
