import Link from 'next/link';
import {
  DollarSign,
  Eye,
  TrendingUp,
  CreditCard,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import { getAdminPayments } from '../../_actions/getAdminPayments';
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

const statusConfig: Record<string, { label: string; className: string }> = {
  PAID: {
    label: 'Paid',
    className: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  PENDING: {
    label: 'Pending',
    className: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  FAILED: {
    label: 'Failed',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-gray-100 text-gray-700 border-gray-200',
  },
};

const methodIcons: Record<string, string> = {
  CARD: '💳',
  CASH: '💵',
  BANK_TRANSFER: '🏦',
  MOBILE_BANKING: '📱',
};

export default async function AdminPaymentsPage() {
  const response = await getAdminPayments();
  const payments = response?.data ?? [];

  const totalRevenue = payments
    .filter((p) => p.status === 'PAID')
    .reduce((s, p) => s + Number(p.amount), 0);
  const pendingAmount = payments
    .filter((p) => p.status === 'PENDING')
    .reduce((s, p) => s + Number(p.amount), 0);
  const failedCount = payments.filter((p) => p.status === 'FAILED').length;
  const paidCount = payments.filter((p) => p.status === 'PAID').length;

  const stats = [
    {
      label: 'Total Revenue',
      value: `৳${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Pending Amount',
      value: `৳${pendingAmount.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Paid Transactions',
      value: paidCount,
      icon: CreditCard,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Failed Payments',
      value: failedCount,
      icon: AlertCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">
          Monitor all platform payment transactions.
        </p>
      </div>

      {/* Stats */}
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

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Booking ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-15" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <XCircle className="h-8 w-8 opacity-30" />
                      No payments found.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((p) => {
                  const sc = statusConfig[p.status] ?? {
                    label: p.status,
                    className: 'bg-gray-100',
                  };
                  return (
                    <TableRow key={p.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {p.transactionId
                          ? p.transactionId.slice(0, 16) + '…'
                          : '—'}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {p.bookingId.slice(0, 8)}…
                      </TableCell>
                      <TableCell className="font-semibold">
                        ৳{Number(p.amount).toLocaleString()}
                        <span className="ml-1 text-xs text-muted-foreground">
                          {p.currency}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1.5">
                          <span>{methodIcons[p.method] ?? '—'}</span>
                          <span className="text-sm">
                            {p.method.replace('_', ' ')}
                          </span>
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {p.provider}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={sc.className}>
                          {sc.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button asChild variant="ghost" size="icon">
                          <Link href={`/admin-dashboard/payments/${p.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
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
