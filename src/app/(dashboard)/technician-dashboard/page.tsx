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
import { getMyTechnicianProfile } from '../_actions/getMyTechnicianProfile';
import { getBookingsByTechnician } from '../_actions/getAllBookingsByTechnician';
import { bookingStatusConfig } from '../dashboard/my-bookings/config/bookingStatusConfig';

export default async function TechnicianDashboardPage() {
  const techProfile = await getMyTechnicianProfile();
  const technicianId = techProfile?.id;

  let bookings: any[] = [];

  if (technicianId) {
    const res = await getBookingsByTechnician(technicianId);
    bookings = res?.data ?? [];
  }

  const totalEarnings = bookings
    .filter((b) => b.status === 'COMPLETED')
    .reduce((sum, b) => sum + (Number(b.service?.price) || 0), 0);

  const stats = [
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
      description: 'Awaiting response',
    },
    {
      title: 'In Progress',
      value: bookings.filter((b) => b.status === 'IN_PROGRESS').length,
      icon: Wrench,
      description: 'Currently active',
    },
    {
      title: 'Completed Jobs',
      value: bookings.filter((b) => b.status === 'COMPLETED').length,
      icon: CheckCircle2,
      description: 'Successfully finished',
    },
    {
      title: 'Average Rating',
      value: techProfile?.averageRating?.toFixed(1) ?? '0.0',
      icon: Star,
      description: `Based on ${techProfile?.totalReviews ?? 0} reviews`,
    },
    {
      title: 'Total Earnings',
      value: `${totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      description: 'From completed jobs',
    },
  ];

  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Technician Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your work.
        </p>
      </div>

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
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground h-24"
                  >
                    No bookings yet.
                  </TableCell>
                </TableRow>
              ) : (
                recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <p className="font-medium">{booking.customer?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {booking.customer?.email}
                      </p>
                    </TableCell>
                    <TableCell>
                      {new Date(booking.bookingDate).toLocaleDateString()}
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
