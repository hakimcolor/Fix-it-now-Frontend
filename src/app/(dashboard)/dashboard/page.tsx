import Link from 'next/link';
import {
  CalendarDays,
  Clock3,
  Wrench,
  CheckCircle2,
  CreditCard,
  Star,
  ArrowRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

import TodayDate from '../_components/TodayDate';
import { getMe } from '@/services/getMe';
import { getAllBookings } from '../_actions/getAllBookings';
import { getMyPayments } from '../_actions/getMyPayments';
import { bookingStatusConfig } from './my-bookings/config/bookingStatusConfig';

type DashboardBooking = {
  id: string;
  customerId?: string;
  customer?: { id?: string };
  status: string;
  scheduledDate?: string;
  timeSlot?: string;
  servicePrice?: number;
  service?: { title?: string };
  technicianProfile?: { user?: { name?: string } };
};

const PAID_PAYMENT_STATUSES = new Set(['PAID', 'COMPLETED']);

export default async function CustomerDashboardHome() {
  const [me, bookingsRes, paymentsRes] = await Promise.all([
    getMe(),
    getAllBookings(),
    getMyPayments().catch(() => ({ data: [] })),
  ]);

  const customerId = me.data?.id;
  const userName = me.data?.name ?? 'there';

  const allBookings: DashboardBooking[] = bookingsRes?.data ?? [];
  const myBookings = customerId
    ? allBookings.filter((b) => {
        const ownerId = b.customerId ?? b.customer?.id;
        return !ownerId || ownerId === customerId;
      })
    : allBookings;

  const payments = paymentsRes?.data ?? [];

  const totalSpent = payments
    .filter((p: { status: string }) => PAID_PAYMENT_STATUSES.has(p.status))
    .reduce(
      (sum: number, p: { amount: number }) => sum + (Number(p.amount) || 0),
      0
    );

  const stats = [
    {
      title: 'Total Bookings',
      value: myBookings.length,
      description: 'All bookings',
      icon: CalendarDays,
    },
    {
      title: 'Pending Bookings',
      value: myBookings.filter((b) => b.status === 'REQUESTED').length,
      description: 'Waiting for confirmation',
      icon: Clock3,
    },
    {
      title: 'Active Services',
      value: myBookings.filter((b) => b.status === 'IN_PROGRESS').length,
      description: 'Currently in progress',
      icon: Wrench,
    },
    {
      title: 'Completed Jobs',
      value: myBookings.filter((b) => b.status === 'COMPLETED').length,
      description: 'Successfully completed',
      icon: CheckCircle2,
    },
    {
      title: 'Total Spent',
      value: `৳${totalSpent.toLocaleString()}`,
      description: 'Lifetime payments',
      icon: CreditCard,
    },
    {
      title: 'Accepted Bookings',
      value: myBookings.filter((b) => b.status === 'ACCEPTED').length,
      description: 'Ready to pay',
      icon: Star,
    },
  ];

  const recentBookings = myBookings.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {userName} 👋
          </h1>
          <p className="mt-1 text-muted-foreground">
            <TodayDate />
          </p>
        </div>
        <Button asChild>
          <Link href="/services">
            Browse Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardDescription>{stat.title}</CardDescription>
                  <CardTitle className="mt-2 text-3xl">{stat.value}</CardTitle>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Your latest service requests.</CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/my-bookings">View all</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No bookings yet. Browse services to get started.
                  </TableCell>
                </TableRow>
              ) : (
                recentBookings.map((booking) => {
                  const cfg =
                    bookingStatusConfig[
                      booking.status as keyof typeof bookingStatusConfig
                    ];
                  return (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">
                        {booking.service?.title ?? 'Service'}
                      </TableCell>
                      <TableCell>
                        {booking.technicianProfile?.user?.name ?? '—'}
                      </TableCell>
                      <TableCell>
                        {booking.scheduledDate
                          ? new Date(booking.scheduledDate).toLocaleDateString()
                          : '—'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cfg?.className}>
                          {cfg?.label ?? booking.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
