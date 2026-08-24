import { CalendarDays, Clock3, User } from 'lucide-react';

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
import BookingActionButtons, {
  BookingStatus,
} from '../../_components/BookingActionButtons';

interface Booking {
  id: string;
  customerId: string;
  serviceId: string;
  servicePrice?: number;
  contactNumber?: string;
  scheduledDate?: string;
  timeSlot?: string;
  status: BookingStatus;
  paymentStatus?: string;
  cancellationReason?: string | null;
  createdAt: string;
  service?: { id: string; title: string; price: number };
  customer?: { name?: string; email?: string };
}

export default async function TechnicianBookingsPage() {
  const response = await getBookingsByTechnician();
  const bookings: Booking[] = response?.data ?? [];

  const counts = {
    total: bookings.length,
    requested: bookings.filter((b) => b.status === 'REQUESTED').length,
    accepted: bookings.filter((b) => b.status === 'ACCEPTED').length,
    inProgress: bookings.filter((b) => b.status === 'IN_PROGRESS').length,
    completed: bookings.filter((b) => b.status === 'COMPLETED').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Booking Management
        </h1>
        <p className="text-muted-foreground">
          Manage customer booking requests and track job progress.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: 'Total', value: counts.total, color: 'text-foreground' },
          {
            label: 'Requested',
            value: counts.requested,
            color: 'text-amber-600',
          },
          { label: 'Accepted', value: counts.accepted, color: 'text-blue-600' },
          {
            label: 'In Progress',
            value: counts.inProgress,
            color: 'text-orange-600',
          },
          {
            label: 'Completed',
            value: counts.completed,
            color: 'text-emerald-600',
          },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
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
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Scheduled Date</TableHead>
                  <TableHead>Time Slot</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status / Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-32 text-center text-muted-foreground"
                    >
                      No bookings found.
                    </TableCell>
                  </TableRow>
                ) : (
                  bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      {/* Customer */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <div>
                            <p className="font-medium">
                              {booking.customer?.name ?? '—'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {booking.customer?.email ?? ''}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Service */}
                      <TableCell>
                        <p className="font-medium text-sm">
                          {booking.service?.title ?? '—'}
                        </p>
                      </TableCell>

                      {/* Scheduled date */}
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          {booking.scheduledDate
                            ? new Date(
                                booking.scheduledDate
                              ).toLocaleDateString()
                            : '—'}
                        </div>
                      </TableCell>

                      {/* Time slot */}
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock3 className="h-4 w-4 text-muted-foreground" />
                          {booking.timeSlot ?? '—'}
                        </div>
                      </TableCell>

                      {/* Price */}
                      <TableCell className="font-semibold text-sm">
                        ৳
                        {Number(
                          booking.servicePrice ?? booking.service?.price ?? 0
                        ).toLocaleString()}
                      </TableCell>

                      {/* Status + action */}
                      <TableCell>
                        <BookingActionButtons
                          bookingId={booking.id}
                          currentStatus={booking.status}
                          paymentStatus={booking.paymentStatus}
                        />
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
