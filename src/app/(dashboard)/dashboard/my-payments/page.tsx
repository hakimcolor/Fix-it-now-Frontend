import {
  CreditCard,
  CircleCheckBig,
  CircleX,
  Clock3,
  Receipt,
  RefreshCcw,
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
import { getMyPayments } from '../../_actions/getMyPayments';

export default async function MyPayments() {
  const result = await getMyPayments();
  const payments = result.data ?? [];

  const totalSpent = payments
    .filter((p) => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-green-50 p-3">
              <CircleCheckBig className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Spent</p>
              <p className="text-2xl font-bold">
                ৳{totalSpent.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-blue-50 p-3">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Payments</p>
              <p className="text-2xl font-bold">{payments.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-amber-50 p-3">
              <Clock3 className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">
                {payments.filter((p) => p.status === 'PENDING').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CreditCard className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View all of your payments.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {payments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Receipt className="mb-4 h-14 w-14 text-muted-foreground" />
              <h3 className="text-lg font-semibold">No Payments Found</h3>
              <p className="text-muted-foreground">
                You haven&apos;t made any payments yet.
              </p>
            </div>
          ) : (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Paid At</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {payments.map((payment, index) => (
                    <TableRow key={payment.id}>
                      <TableCell>{index + 1}</TableCell>

                      <TableCell className="font-medium">
                        {payment.booking?.service?.title ?? (
                          <span className="text-muted-foreground text-xs">
                            {payment.bookingId.slice(0, 8)}…
                          </span>
                        )}
                      </TableCell>

                      <TableCell className="font-semibold">
                        ৳{Number(payment.amount).toLocaleString()}
                      </TableCell>

                      <TableCell>
                        <Badge variant="secondary">{payment.provider}</Badge>
                      </TableCell>

                      <TableCell>
                        {payment.status === 'COMPLETED' && (
                          <Badge className="gap-1 bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                            <CircleCheckBig className="h-3.5 w-3.5" />
                            Completed
                          </Badge>
                        )}
                        {payment.status === 'PENDING' && (
                          <Badge variant="secondary" className="gap-1">
                            <Clock3 className="h-3.5 w-3.5" />
                            Pending
                          </Badge>
                        )}
                        {payment.status === 'FAILED' && (
                          <Badge variant="destructive" className="gap-1">
                            <CircleX className="h-3.5 w-3.5" />
                            Failed
                          </Badge>
                        )}
                        {payment.status === 'REFUNDED' && (
                          <Badge variant="outline" className="gap-1">
                            <RefreshCcw className="h-3.5 w-3.5" />
                            Refunded
                          </Badge>
                        )}
                      </TableCell>

                      <TableCell className="font-mono text-xs">
                        {payment.transactionId
                          ? `${payment.transactionId.slice(0, 16)}…`
                          : '—'}
                      </TableCell>

                      <TableCell>
                        {payment.paidAt
                          ? new Date(payment.paidAt).toLocaleDateString()
                          : '—'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
