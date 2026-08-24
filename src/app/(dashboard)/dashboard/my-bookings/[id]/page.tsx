import { getBookingById } from '@/app/(dashboard)/_actions/getBookingById';
import { getTechnicianById } from '@/app/(dashboard)/_actions/getTechnicianById';

import Link from 'next/link';
import Image from 'next/image';

import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  User,
  Wrench,
  CreditCard,
} from 'lucide-react';
import CancelBookingButton from '@/app/(dashboard)/_components/CancelBookingButton';
import PayNowButton from '../_components/PayNowButton';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import {
  bookingStatusConfig,
  paymentStatusConfig,
} from '../config/bookingStatusConfig';

export default async function SingleBookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getBookingById(id);
  const booking = result?.data;

  if (!booking) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p>Booking not found.</p>
      </div>
    );
  }

  const technicianRes = booking.technicianProfileId
    ? await getTechnicianById(booking.technicianProfileId)
    : null;
  const technician =
    technicianRes?.data?.technician?.user ??
    technicianRes?.data?.user ??
    booking.technicianProfile?.user;

  const bookingStatus =
    bookingStatusConfig[booking.status as keyof typeof bookingStatusConfig];

  const paymentStatus = booking.payment?.status
    ? paymentStatusConfig[
        booking.payment.status as keyof typeof paymentStatusConfig
      ]
    : null;

  const scheduledDate = booking.scheduledDate ?? booking.scheduledDate;
  const timeSlot = booking.timeSlot ?? booking.timeSlot;
  const price = booking.servicePrice ?? booking.service?.price ?? 0;
  const serviceImage =
    booking.service?.image || booking.service?.thumbnail || null;

  const canCancel = !['IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DECLINED'].includes(
    booking.status
  );

  const canPay =
    booking.status === 'ACCEPTED' &&
    (!booking.payment ||
      (booking.payment.status !== 'COMPLETED' &&
        booking.payment.status !== 'PAID'));

  return (
    <div className="container mx-auto max-w-6xl space-y-6 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link href="/dashboard/my-bookings">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bookings
          </Button>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {canPay && <PayNowButton bookingId={booking.id} />}
          {canCancel && <CancelBookingButton bookingId={booking.id} />}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Service Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {serviceImage && (
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <Image
                src={serviceImage}
                alt={booking.service?.title ?? 'Service'}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {bookingStatus && (
              <Badge className={bookingStatus.className}>
                {bookingStatus.label}
              </Badge>
            )}
            {paymentStatus && (
              <Badge className={paymentStatus.className}>
                {paymentStatus.label}
              </Badge>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {booking.service?.title ?? 'Service'}
            </h2>
            {booking.service?.description && (
              <p className="mt-2 text-muted-foreground">
                {booking.service.description}
              </p>
            )}
          </div>

          <div className="text-2xl font-bold text-primary">৳ {price}</div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Scheduled Date</p>
                <p className="font-medium">
                  {scheduledDate
                    ? new Date(scheduledDate).toLocaleDateString()
                    : '—'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Time Slot</p>
                <p className="font-medium">{timeSlot ?? '—'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <p className="font-medium">
                  {booking.payment?.status ?? 'Not Paid'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technician</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">
                {technician?.name ??
                  booking.technicianProfile?.user?.name ??
                  'Assigned Technician'}
              </h3>
              {technician?.email && (
                <p className="text-muted-foreground">Email: {technician.email}</p>
              )}
              {technician?.phone && (
                <p className="text-muted-foreground">
                  Mobile: {technician.phone}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Customer Note
          </CardTitle>
        </CardHeader>

        <CardContent>
          {booking.note || booking.cancellationReason ? (
            <p>{booking.note || booking.cancellationReason}</p>
          ) : (
            <p className="text-muted-foreground">No additional note provided.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p>{booking.customer?.name ?? '—'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p>{booking.customer?.email ?? '—'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p>{booking.contactNumber ?? '—'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Booking ID</p>
            <p className="break-all text-xs">{booking.id}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
