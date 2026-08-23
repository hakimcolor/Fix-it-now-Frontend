import { DollarSign, TrendingUp, CheckCircle2, Clock3 } from 'lucide-react';
import { getMe } from '@/services/getMe';
import { getBookingsByTechnician } from '../../_actions/getAllBookingsByTechnician';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { bookingStatusConfig } from '../dashboard/my-bookings/config/bookingStatusConfig';

export default async function TechnicianEarningsPage() {
  const me = await getMe();
  const technicianId = me.data?.profile?.technicianProfile?.id;

  let bookings: {
    id: string;
    status: string;
    paymentStatus: string;
    bookingDate: string;
    customer?: { name: string; email: string };
    service?: { title: string; price: number };
  }[] = [];

  if (technicianId) {
    const res = await getBookingsByTechnician(technicianId);
    bookings = res?.data ?? [];
  }

  const completed = bookings.filter((b) => b.status === 'COMPLETED');
  const inProgress = bookings.filter((b) => b.status === 'IN_PROGRESS');
  const totalEarnings = completed.reduce(
    (sum, b) => sum + (Number(b.service?.price) || 0),
    0
  );
  const pendingEarnings = inProgress.reduce(
    (sum, b) => sum + (Number(b.service?.price) || 0),
    0
  );
  const avgEarning = completed.length
    ? Math.round(totalEarnings / completed.length)
    : 0;

  const stats = [
    {
      label: 'Total Earnings',
      value: `৳${totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Pending (In Progress)',
      value: `৳${pendingEarnings.toLocaleString()}`,
      icon: Clock3,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Completed Jobs',
      value: completed.length,
      icon: CheckCircle2,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Avg per Job',
      value: `৳${avgEarning.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Earnings</h1>
        <p className="text-muted-foreground">
          Track your income from completed jobs.
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
        <CardHeader>
          <CardTitle>Completed Jobs</CardTitle>
          <CardDescription>
            All earnings from completed bookings.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completed.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No completed jobs yet.
                  </TableCell>
                </TableRow>
              ) : (
                completed.map((b) => {
                  const bsc =
                    bookingStatusConfig[
                      b.status as keyof typeof bookingStatusConfig
                    ];
                  return (
                    <TableRow key={b.id}>
                      <TableCell>
                        <p className="font-medium">{b.customer?.name ?? '—'}</p>
                        <p className="text-xs text-muted-foreground">
                          {b.customer?.email}
                        </p>
                      </TableCell>
                      <TableCell className="text-sm">
                        {b.service?.title ?? '—'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(b.bookingDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={bsc?.className ?? ''}
                        >
                          {bsc?.label ?? b.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-emerald-600">
                        ৳{Number(b.service?.price || 0).toLocaleString()}
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
