import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAllBookings } from '../../_actions/getAllBookings';
import { getMe } from '@/services/getMe';
import { bookingStatusConfig } from './config/bookingStatusConfig';
import CancelBookingButton from '../../_components/CancelBookingButton';
import PayNowButton from './_components/PayNowButton';

interface Booking {
  id: string;
  customerId: string;
  serviceId: string;
  technicianProfileId: string;
  servicePrice: number;
  contactNumber: string;
  scheduledDate: string;
  timeSlot: string;
  status: keyof typeof bookingStatusConfig;
  cancellationReason?: string;
  service?: {
    id: string;
    title: string;
    price: number;
    category?: { name: string };
  };
  technicianProfile?: { id: string; user?: { name: string } };
  review?: { id: string } | null;
  payment?: { id: string; status: string; amount: number } | null;
  createdAt: string;
}

export default async function MyBookings() {
  const [result, user] = await Promise.all([getAllBookings(), getMe()]);
  const customerId = user?.data?.id;

  const allBookings: Booking[] = result?.data ?? [];
  const bookings = allBookings.filter((b) => b.customerId === customerId);

  if (!bookings.length) {
    return (
      <div className="container mx-auto py-16">
        <Card className="mx-auto max-w-xl">
          <CardContent className="space-y-4 py-12 text-center">
            <h2 className="text-2xl font-bold">No Bookings Found</h2>
            <p className="text-muted-foreground">
              You haven&apos;t booked any services yet.
            </p>
            <Button asChild>
              <Link href="/services">Browse Services</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">My Bookings</CardTitle>
          <CardDescription>Manage all your booked services.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time Slot</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {bookings.map((booking) => {
                  const cfg = bookingStatusConfig[booking.status];
                  const canCancel = ![
                    'IN_PROGRESS',
                    'COMPLETED',
                    'CANCELLED',
                    'DECLINED',
                  ].includes(booking.status);

                  return (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <p className="font-semibold">
                          {booking.service?.title ?? 'Service'}
                        </p>
                        {booking.service?.category?.name && (
                          <p className="text-xs text-muted-foreground">
                            {booking.service.category.name}
                          </p>
                        )}
                      </TableCell>

                      <TableCell>
                        {booking.technicianProfile?.user?.name ?? '—'}
                      </TableCell>

                      <TableCell>
                        {new Date(booking.scheduledDate).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                          {booking.timeSlot}
                        </span>
                      </TableCell>

                      <TableCell className="font-semibold">
                        ৳{booking.servicePrice}
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline" className={cfg?.className}>
                          {cfg?.label ?? booking.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2 flex-wrap">
                          {/* REQUESTED */}
                          {booking.status === 'REQUESTED' && (
                            <Button size="sm" variant="secondary" disabled>
                              Waiting…
                            </Button>
                          )}

                          {/* ACCEPTED → Pay Now */}
                          {booking.status === 'ACCEPTED' && (
                            <PayNowButton bookingId={booking.id} />
                          )}

                          {/* DECLINED */}
                          {booking.status === 'DECLINED' && (
                            <Button size="sm" variant="destructive" disabled>
                              Declined
                            </Button>
                          )}

                          {/* PAID */}
                          {booking.status === 'PAID' && (
                            <Button size="sm" variant="secondary" disabled>
                              Waiting for Technician
                            </Button>
                          )}

                          {/* IN_PROGRESS */}
                          {booking.status === 'IN_PROGRESS' && (
                            <Button size="sm" variant="secondary" disabled>
                              In Progress
                            </Button>
                          )}

                          {/* COMPLETED */}
                          {booking.status === 'COMPLETED' &&
                            !booking.review && (
                              <Button size="sm" asChild>
                                <Link
                                  href={`/dashboard/my-bookings/${booking.id}/leave-review`}
                                >
                                  Leave Review
                                </Link>
                              </Button>
                            )}

                          {booking.status === 'COMPLETED' && booking.review && (
                            <Badge variant="secondary">Reviewed</Badge>
                          )}

                          {/* CANCELLED */}
                          {booking.status === 'CANCELLED' && (
                            <Button size="sm" variant="destructive" disabled>
                              Cancelled
                            </Button>
                          )}

                          {/* Cancel button */}
                          {canCancel && (
                            <CancelBookingButton bookingId={booking.id} />
                          )}

                          <Button asChild size="sm" variant="outline">
                            <Link href={`/dashboard/my-bookings/${booking.id}`}>
                              Details
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
