import Link from 'next/link';
import {
  CalendarCheck,
  Clock3,
  CheckCircle2,
  XCircle,
  Eye,
} from 'lucide-react';
import { getAdminBookings } from '../../_actions/getAdminBookings';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  bookingStatusConfig,
  paymentStatusConfig,
} from '../../dashboard/my-bookings/config/bookingStatusConfig';

export default async function AdminBookingPage() {
  const response = await getAdminBookings();
  const bookings = response?.data ?? [];

  const stats = [
    {
      label: 'Total',
      value: bookings.length,
      icon: CalendarCheck,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Pending',
      value: bookings.filter(
        (b: { status: string }) => b.status === 'REQUESTED'
      ).length,
      icon: Clock3,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Completed',
      value: bookings.filter(
        (b: { status: string }) => b.status === 'COMPLETED'
      ).length,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Cancelled',
      value: bookings.filter(
        (b: { status: string }) => b.status === 'CANCELLED'
      ).length,
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">
          Manage all customer bookings across the platform.
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

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Booking Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-15" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No bookings found.
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map(
                  (b: {
                    id: string;
                    bookingDate: string;
                    status: string;
                    paymentStatus: string;
                    note: string | null;
                    createdAt: string;
                    customer?: { name: string; email: string };
                  }) => {
                    const bsc =
                      bookingStatusConfig[
                        b.status as keyof typeof bookingStatusConfig
                      ];
                    const psc =
                      paymentStatusConfig[
                        b.paymentStatus as keyof typeof paymentStatusConfig
                      ];
                    return (
                      <TableRow key={b.id}>
                        <TableCell>
                          <p className="font-medium">
                            {b.customer?.name ?? '—'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {b.customer?.email}
                          </p>
                        </TableCell>
                        <TableCell className="text-sm">
                          {b.bookingDate
                            ? new Date(b.bookingDate).toLocaleDateString()
                            : '—'}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={bsc?.className ?? ''}
                          >
                            {bsc?.label ?? b.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={psc?.className ?? ''}
                          >
                            {psc?.label ?? b.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-40 truncate text-sm text-muted-foreground">
                          {b.note ?? '—'}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(b.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button asChild variant="ghost" size="icon">
                            <Link href={`/admin-dashboard/bookings/${b.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
