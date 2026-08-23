import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CreditCard,
  FileText,
  User,
  Wrench,
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
import UpdateBookingStatusByTechnician from '../../_components/updateBookingStatusByTechnician';
import { BookingSlot } from '../../types/bookingSlotProps';

// Reuse the admin booking-by-id action (hits /api/admin/bookings/:id)
// For technician we use the standard /api/bookings/:id endpoint
import { getBookingById } from '../../_actions/getBookingById';

export default async function TechnicianBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getBookingById(id);

  if (!res?.data) notFound();

  const b = res.data;

  const bsc = bookingStatusConfig[b.status as keyof typeof bookingStatusConfig];
  const psc =
    paymentStatusConfig[b.paymentStatus as keyof typeof paymentStatusConfig];

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button asChild variant="outline" size="sm">
          <Link href="/technician-dashboard/bookings">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bookings
          </Link>
        </Button>

        <UpdateBookingStatusByTechnician
          bookingId={b.id}
          currentStatus={b.status}
        />
      </div>

      {/* Status cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-0 bg-linear-to-br from-primary/10 to-background">
          <CardContent className="p-5">
            <p className="mb-2 text-xs text-muted-foreground">Booking Status</p>
            <Badge
              variant="outline"
              className={`text-sm px-3 py-1 ${bsc?.className ?? ''}`}
            >
              {bsc?.label ?? b.status}
            </Badge>
          </CardContent>
        </Card>
        <Card className="border-0 bg-linear-to-br from-violet-500/10 to-background">
          <CardContent className="p-5">
            <p className="mb-2 text-xs text-muted-foreground">Payment Status</p>
            <Badge
              variant="outline"
              className={`text-sm px-3 py-1 ${psc?.className ?? ''}`}
            >
              {psc?.label ?? b.paymentStatus}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer */}
        {b.customer && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{b.customer.name}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{b.customer.email}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium">{b.customer.phone ?? '—'}</span>
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
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Title</span>
                <span className="font-medium">{b.service.title}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price</span>
                <span className="font-medium text-primary text-lg">
                  ৳{b.service.price}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">
                  {b.service.estimatedDuration} min
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Booking Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="h-4 w-4" />
            Booking Info
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Booking Date</p>
            <p className="font-medium">
              {b.bookingDate ? new Date(b.bookingDate).toLocaleString() : '—'}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Created At</p>
            <p className="font-medium">
              {new Date(b.createdAt).toLocaleString()}
            </p>
          </div>
          {b.acceptedAt && (
            <div>
              <p className="text-xs text-muted-foreground">Accepted At</p>
              <p className="font-medium">
                {new Date(b.acceptedAt).toLocaleString()}
              </p>
            </div>
          )}
          {b.completedAt && (
            <div>
              <p className="text-xs text-muted-foreground">Completed At</p>
              <p className="font-medium">
                {new Date(b.completedAt).toLocaleString()}
              </p>
            </div>
          )}
          {b.note && (
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">Note</p>
              <p className="font-medium">{b.note}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking Slots */}
      {b.bookingSlots?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4" />
              Booking Slots
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {b.bookingSlots.map((slot: BookingSlot) => (
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
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
