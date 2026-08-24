import Link from 'next/link';
import { CalendarDays, Clock3, Eye, User } from 'lucide-react';

import { getMyTechnicianProfile } from '../../_actions/getMyTechnicianProfile';
import { getBookingsByTechnician } from '../../_actions/getAllBookingsByTechnician';
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
import { Button } from '@/components/ui/button';
import BookingActionButtons from '../../_components/BookingActionButtons';
import { paymentStatusConfig } from '../../dashboard/my-bookings/config/bookingStatusConfig';

export type BookingStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'PAID'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

interface BookingSlot {
  id: string;
  startsAt: string;
  endsAt: string;
}

interface Booking {
  id: string;
  customerId: string;
  bookingDate: string;
  status: BookingStatus;
  paymentStatus: string;
  customer: { id: string; name: string; email: string; phone: string };
  bookingSlots: BookingSlot[];
  service?: { title: string; price: number };
}

export default async function TechnicianBookingsPage() {
  const techProfile = await getMyTechnicianProfile();
  const technicianId = techProfile?.id;

  if (!technicianId) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Technician profile not found.
      </div>
    );
  }

  const response = await getBookingsByTechnician(technicianId);
  const bookings: Booking[] = response?.data ?? [];

  const counts = {
    total: bookings.length,
    requested: bookings.filter((b) => b.status === 'REQUESTED').length,
    accepted: bookings.filter((b) => b.status === 'ACCEPTED').length,
    inProgress: bookings.filter((b) => b.status === 'IN_PROGRESS').length,
    completed: bookings.filter((b) => b.status === 'COMPLETED').length,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Booking Management</h1>
        <p className="text-muted-foreground">
          Manage customer booking requests and track job progress.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: 'Total', value: counts.total },
          { label: 'Requested', value: counts.requested },
          { label: 'Accepted', value: counts.accepted },
          { label: 'In Progress', value: counts.inProgress },
          { label: 'Completed', value: counts.completed },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>
            Accept, decline, or update the status of each booking.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time Slot</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status / Action</TableHead>
                  <TableHead className="text-right">Details</TableHead>
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
                  bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <div>
                            <p className="font-medium">
                              {booking.customer.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {booking.customer.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">
                          {booking.service?.title ?? '—'}
                        </p>
                        {booking.service?.price && (
                          <p className="text-xs text-muted-foreground">
                            ৳{booking.service.price}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {booking.bookingSlots.map((slot) => (
                            <div
                              key={slot.id}
                              className="flex items-center gap-1 text-sm"
                            >
                              <Clock3 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                              {slot.startsAt} – {slot.endsAt}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            paymentStatusConfig[
                              booking.paymentStatus as keyof typeof paymentStatusConfig
                            ]?.className
                          }
                        >
                          {booking.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <BookingActionButtons
                          bookingId={booking.id}
                          currentStatus={booking.status}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="outline" size="icon">
                          <Link
                            href={`/technician-dashboard/bookings/${booking.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
