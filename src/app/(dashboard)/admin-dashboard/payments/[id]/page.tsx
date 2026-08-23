import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  CreditCard,
  FileText,
  Hash,
  Calendar,
  Building2,
} from 'lucide-react';
import { getAdminPaymentById } from '../../../_actions/getAdminPaymentById';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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

export default async function AdminPaymentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getAdminPaymentById(id);

  if (!res?.data) notFound();

  const p = res.data;
  const sc = statusConfig[p.status] ?? {
    label: p.status,
    className: 'bg-gray-100',
  };

  const rows = [
    { icon: Hash, label: 'Payment ID', value: p.id },
    { icon: FileText, label: 'Booking ID', value: p.bookingId },
    { icon: Hash, label: 'Transaction ID', value: p.transactionId ?? '—' },
    { icon: CreditCard, label: 'Method', value: p.method?.replace('_', ' ') },
    { icon: Building2, label: 'Provider', value: p.provider },
    {
      icon: Calendar,
      label: 'Created',
      value: new Date(p.createdAt).toLocaleString(),
    },
    {
      icon: Calendar,
      label: 'Updated',
      value: new Date(p.updatedAt).toLocaleString(),
    },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin-dashboard/payments">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Payment Detail</h1>
          <p className="text-sm text-muted-foreground font-mono">
            {p.id.slice(0, 20)}…
          </p>
        </div>
      </div>

      {/* Amount hero */}
      <Card className="border-0 bg-linear-to-br from-primary/10 via-primary/5 to-background">
        <CardContent className="flex items-center justify-between p-8">
          <div>
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="text-5xl font-extrabold tracking-tight">
              ৳{Number(p.amount).toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{p.currency}</p>
          </div>
          <Badge
            variant="outline"
            className={`text-sm px-4 py-1.5 ${sc.className}`}
          >
            {sc.label}
          </Badge>
        </CardContent>
      </Card>

      {/* Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Transaction Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-0 p-0">
          {rows.map((row, i) => {
            const Icon = row.icon;
            return (
              <div key={row.label}>
                <div className="flex items-center gap-3 px-6 py-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{row.label}</p>
                    <p className="truncate font-medium text-sm">{row.value}</p>
                  </div>
                </div>
                {i < rows.length - 1 && <Separator />}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
