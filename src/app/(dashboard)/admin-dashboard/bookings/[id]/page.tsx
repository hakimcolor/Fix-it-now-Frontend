import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  User,
  Wrench,
  Clock,
  FileText,
  CreditCard,
} from 'lucide-react';
import { getAdminBookingById } from '../../../_actions/getAdminBookingById';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  bookingStatusConfig,
  paymentStatusConfig,
} from '../../dashboard/my-bookings/config/bookingStatusConfig';

export default async function AdminBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getAdminBookingById(id);

  if (!res?.data) notFound();

  const b = res.data;

  const bsc = bookingStatusConfig[b.status as keyof typeof bookingStatusConfig];
  const psc =
    paymentStatusConfig[b.paymentStatus as keyof typeof paymentStatusConfig];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin-dashboard/bookings">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Booking Detail</h1>
          <p className="text-sm text-muted-foreground font-mono">
            {b.id?.slice(0, 20)}…
          </p>
        </div>
      </div>

      {/* Status hero */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-0 bg-linear-to-br from-primary/10 to-background">
          <CardContent className="p-6">
            <p className="text-xs text-muted-foreground mb-1">Booking Status</p>
            <Badge
              variant="outline"
              className={`text-sm px-3 py-1 ${bsc?.className ?? ''}`}
            >
              {bsc?.label ?? b.status}
            </Badge>
          </CardContent>
        </Card>
        <Card className="border-0 bg-linear-to-br from-violet-500/10 to-background">
          <CardContent className="p-6">
            <p className="text-xs text-muted-foreground mb-1">Payment Status</p>
            <Badge
              variant="outline"
              className={`text-sm px-3 py-1 ${psc?.className ?? ''}`}
            >
              {psc?.label ?? b.paymentStatus}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Customer */}
      {b.customer && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4" />
              Customer
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Name</p>
              <p className="font-medium">{b.customer.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Email</p>
              <p className="font-medium">{b.customer.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Phone</p>
              <p className="font-medium">{b.customer.phone ?? '—'}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Service */}
      {b.service && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Wrench className="h-4 w-4" />
              Service
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Title</p>
              <p className="font-medium">{b.service.title}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Price</p>
              <p className="font-medium">৳{b.service.price}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Duration</p>
              <p className="font-medium">{b.service.estimatedDuration} min</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Booking Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="h-4 w-4" />
            Booking Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-0 p-0">
          {[
            {
              icon: Calendar,
              label: 'Booking Date',
              value: b.bookingDate
                ? new Date(b.bookingDate).toLocaleString()
                : '—',
            },
            {
              icon: Clock,
              label: 'Created At',
              value: new Date(b.createdAt).toLocaleString(),
            },
            {
              icon: Clock,
              label: 'Accepted At',
              value: b.acceptedAt
                ? new Date(b.acceptedAt).toLocaleString()
                : '—',
            },
            {
              icon: Clock,
              label: 'Completed At',
              value: b.completedAt
                ? new Date(b.completedAt).toLocaleString()
                : '—',
            },
            {
              icon: Clock,
              label: 'Cancelled At',
              value: b.cancelledAt
                ? new Date(b.cancelledAt).toLocaleString()
                : '—',
            },
            { icon: FileText, label: 'Note', value: b.note ?? '—' },
            {
              icon: CreditCard,
              label: 'Cancel Reason',
              value: b.cancelReason ?? '—',
            },
          ].map((row, i, arr) => {
            const Icon = row.icon;
            return (
              <div key={row.label}>
                <div className="flex items-center gap-3 px-6 py-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{row.label}</p>
                    <p className="text-sm font-medium">{row.value}</p>
                  </div>
                </div>
                {i < arr.length - 1 && <Separator />}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Booking Slots */}
      {b.bookingSlots?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Booking Slots</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {b.bookingSlots.map(
              (slot: {
                id: string;
                date: string;
                startsAt: string;
                endsAt: string;
                isAvailable: boolean;
              }) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between rounded-lg border p-3 text-sm"
                >
                  <div>
                    <p className="font-medium">
                      {new Date(slot.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(slot.startsAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      {' – '}
                      {new Date(slot.endsAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <Badge variant={slot.isAvailable ? 'default' : 'secondary'}>
                    {slot.isAvailable ? 'Available' : 'Booked'}
                  </Badge>
                </div>
              )
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
