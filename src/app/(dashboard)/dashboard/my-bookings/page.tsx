

import Link from "next/link";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getAllBookings } from "../../_actions/getAllBookings";
import { getMe } from "@/services/getMe";
import { BookingDetailsProps } from "@/types/types.service";
import { bookingStatusConfig, paymentStatusConfig } from "./config/bookingStatusConfig";


export default async function MyBookings() {
  const result = await getAllBookings();
  const user = await getMe();

  const customerId = user.data.profile.id;

  const bookings =
    result?.data.filter(
      (booking: BookingDetailsProps) =>
        booking.customerId === customerId
    ) || [];

  if (!bookings.length) {
    return (
      <div className="container mx-auto py-16">
        <Card className="mx-auto max-w-xl">
          <CardContent className="space-y-4 py-12 text-center">
            <h2 className="text-2xl font-bold">
              No Bookings Found
            </h2>

            <p className="text-muted-foreground">
              You haven't booked any services yet.
            </p>

            <Button asChild>
              <Link href="/services">
                Browse Services
              </Link>
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
          <CardTitle className="text-3xl">
            My Bookings
          </CardTitle>

          <CardDescription>
            Manage all your booked services.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {bookings.map(
                  (booking: BookingDetailsProps) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Image
                            src={booking.service?.thumbnail}
                            alt={booking.service?.title }
                            width={60}
                            height={60}
                            className="h-14 w-14 rounded-md object-cover"
                          />

                          <div>
                            <p className="font-semibold">
                              {booking.service?.title || "Service title"}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        {new Date(
                          booking.bookingDate
                        ).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            bookingStatusConfig[
                              booking.status as keyof typeof bookingStatusConfig
                            ]?.className
                          }
                        >
                          {
                            bookingStatusConfig[
                              booking.status as keyof typeof bookingStatusConfig
                            ]?.label
                          }
                        </Badge>
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
                        ${booking.service?.price || 0}
                      </TableCell>

                      <TableCell>
                        {booking.service?.estimatedDuration} mins
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {/* REQUESTED */}
                          {booking.status ===
                            "REQUESTED" && (
                              <Button
                                size="sm"
                                variant="secondary"
                                disabled
                              >
                                Waiting...
                              </Button>
                            )}

                          {/* ACCEPTED */}
                          {/* {booking.status ===
                            "ACCEPTED" && (
                              <Button size="sm">
                                <Link
                                  href={`/dashboard/my-bookings/${booking.id}/payment`}
                                >
                                  Pay Now
                                </Link>

                              </Button>
                            )} */}

                          {/* ACCEPTED */}
                          {booking.status === "ACCEPTED" && (
                            booking.paymentStatus === "CANCELLED" ? (
                              <Button
                                size="sm"
                                variant="secondary"
                                disabled
                              >
                                Payment Completed
                              </Button>
                            ) : (
                              <Button size="sm" asChild>
                                <Link
                                  href={`/dashboard/my-bookings/${booking.id}/payment`}
                                >
                                  Pay Now
                                </Link>
                              </Button>
                            )
                          )}

                          {/* DECLINED */}
                          {booking.status ===
                            "DECLINED" && (
                              <Button
                                size="sm"
                                variant="destructive"
                                disabled
                              >
                                Declined
                              </Button>
                            )}

                          {/* PAID */}
                          {booking.status ===
                            "PAID" && (
                              <Button
                                size="sm"
                                variant="secondary"
                                disabled
                              >
                                Waiting for Technician
                              </Button>
                            )}

                          {/* IN_PROGRESS */}
                          {booking.status ===
                            "IN_PROGRESS" && (
                              <Button
                                size="sm"
                                variant="secondary"
                                disabled
                              >
                                In Progress
                              </Button>
                            )}

                          {/* COMPLETED */}
                          {booking.status ===
                            "COMPLETED" && (
                              <Button size="sm">
                               
                                <Link
                                 href={`/dashboard/my-bookings/${booking.id}/leave-review`}
                                >
                                  Leave Review
                                </Link>
                              </Button>
                            )}

                          {/* CANCELLED */}
                          {booking.status ===
                            "CANCELLED" && (
                              <Button
                                size="sm"
                                variant="destructive"
                                disabled
                              >
                                Cancelled
                              </Button>
                            )}

                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                          >
                            <Link
                              href={`/dashboard/my-bookings/${booking.id}`}
                            >
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}













