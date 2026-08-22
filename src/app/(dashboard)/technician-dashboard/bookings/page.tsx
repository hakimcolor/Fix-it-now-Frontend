// import { CalendarDays, CheckCircle2, Clock3, DollarSign, ListChecks, Wrench, XCircle } from "lucide-react";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// const stats = [
//   {
//     title: "Total Bookings",
//     value: 128,
//     icon: ListChecks,
//     color: "text-primary",
//     description: "All time bookings",
//   },
//   {
//     title: "Pending Requests",
//     value: 12,
//     icon: Clock3,
//     color: "text-yellow-500",
//     description: "Waiting for response",
//   },
//   {
//     title: "Today's Jobs",
//     value: 5,
//     icon: CalendarDays,
//     color: "text-blue-500",
//     description: "Scheduled today",
//   },
//   {
//     title: "Accepted",
//     value: 46,
//     icon: CheckCircle2,
//     color: "text-emerald-500",
//     description: "Ready to work",
//   },
//   {
//     title: "In Progress",
//     value: 7,
//     icon: Wrench,
//     color: "text-orange-500",
//     description: "Currently working",
//   },
//   {
//     title: "Completed",
//     value: 63,
//     icon: CheckCircle2,
//     color: "text-green-600",
//     description: "Successfully finished",
//   },
//   {
//     title: "Cancelled",
//     value: 8,
//     icon: XCircle,
//     color: "text-red-500",
//     description: "Cancelled bookings",
//   },
//   {
//     title: "Total Earnings",
//     value: "$54,800",
//     icon: DollarSign,
//     color: "text-emerald-600",
//     description: "Lifetime earnings",
//   },
// ];

// export default function TechnicianBookingsPage() {
//   return (
//     <div className="space-y-8">
//       {/* Heading */}
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">
//           Booking Management
//         </h1>

//         <p className="mt-2 text-muted-foreground">
//           Manage customer booking requests, monitor ongoing jobs, and track
//           completed services.
//         </p>
//       </div>

//       {/* Statistics */}
//       <section>
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
//           {stats.map((stat) => {
//             const Icon = stat.icon;

//             return (
//               <Card
//                 key={stat.title}
//                 className="transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
//               >
//                 <CardHeader className="flex flex-row items-center justify-between pb-2">
//                   <CardTitle className="text-sm font-medium text-muted-foreground">
//                     {stat.title}
//                   </CardTitle>

//                   <div className="rounded-lg bg-muted p-2">
//                     <Icon className={`h-5 w-5 ${stat.color}`} />
//                   </div>
//                 </CardHeader>

//                 <CardContent>
//                   <div className="text-3xl font-bold">{stat.value}</div>

//                   <p className="mt-1 text-sm text-muted-foreground">
//                     {stat.description}
//                   </p>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </section>
//     </div>
//   );
// }






























// export default async function TechnicianBookingsPage() {
// const bookings = await getBookingsByTechnician(
//   "b2365bc4-5a38-458a-b87b-505e570ceba4"
// );

// console.log(bookings.data);

//   return (
//     <div>TechnicianBookingsPage</div>
//   )
// }






import Link from "next/link";

import { getMe } from "@/services/getMe";
import { getBookingsByTechnician } from "../../_actions/getAllBookingsByTechnician";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  CalendarDays,
  Clock3,
  Eye,
  User,
} from "lucide-react";
import UpdateBookingStatusByTechnician from "../../_components/updateBookingStatusByTechnician";

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface BookingSlot {
  id: string;
  serviceId: string;
  bookingId: string | null;
  date: string;
  startsAt: string;
  endsAt: string;
  isAvailable: boolean;
  isBooked: boolean;
  note: string | null;
  bookingDeadline: string;
  maxBookings: number;
  bookedCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;

  bookingDate: string;
  note: string | null;

  status: BookingStatus;
  paymentStatus: PaymentStatus;

  acceptedAt: string | null;
  cancelledAt: string | null;
  completedAt: string | null;
  cancelReason: string | null;

  createdAt: string;
  updatedAt: string;

  customer: Customer;
  bookingSlots: BookingSlot[];
}

export default async function TechnicianBookingsPage() {
  const me = await getMe();

  const technicianId =
    me.data?.profile?.technicianProfile?.id;

  if (!technicianId) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Technician profile not found.
      </div>
    );
  }

  const response =
    await getBookingsByTechnician(technicianId);

  const bookings: Booking[] = response?.data || [];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          My Bookings
        </h1>

        <p className="text-muted-foreground">
          Manage all customer bookings.
        </p>
      </div>

      {/* Summary */}

      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>

          <CardDescription>
            Overview of your bookings.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Bookings
            </p>

            <p className="text-2xl font-bold">
              {bookings.length}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Requested
            </p>

            <p className="text-2xl font-bold">
              {
                bookings.filter(
                  (b) => b.status === "REQUESTED"
                ).length
              }
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Accepted
            </p>

            <p className="text-2xl font-bold">
              {
                bookings.filter(
                  (b) => b.status === "ACCEPTED"
                ).length
              }
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Completed
            </p>

            <p className="text-2xl font-bold">
              {
                bookings.filter(
                  (b) => b.status === "COMPLETED"
                ).length
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}

      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>

          <CardDescription>
            All customer booking requests.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time Slot</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
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
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />

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
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />

                        {new Date(
                          booking.bookingDate
                        ).toLocaleDateString()}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        {booking.bookingSlots.map(
                          (slot) => (
                            <div
                              key={slot.id}
                              className="flex items-center gap-2 text-sm"
                            >
                              <Clock3 className="h-4 w-4" />

                              {slot.startsAt} -{" "}
                              {slot.endsAt}
                            </div>
                          )
                        )}
                      </div>
                    </TableCell>

                    {/* <TableCell>
                      <Badge>
                        {booking.status}
                      </Badge>
                    </TableCell> */}


                    <TableCell>
                      <UpdateBookingStatusByTechnician
                        bookingId={booking.id}
                        currentStatus={booking.status}
                      />
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">
                        {booking.paymentStatus}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                      >
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
        </CardContent>
      </Card>
    </div>
  );
}