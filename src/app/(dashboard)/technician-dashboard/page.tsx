


import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  Star,
  Wrench,
} from "lucide-react";

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

const stats = [
  {
    title: "Total Bookings",
    value: 124,
    icon: CalendarDays,
    description: "+12 this month",
  },
  {
    title: "Pending Requests",
    value: 8,
    icon: Clock3,
    description: "Awaiting response",
  },
  {
    title: "Today's Jobs",
    value: 3,
    icon: Wrench,
    description: "Scheduled today",
  },
  {
    title: "Completed Jobs",
    value: 116,
    icon: CheckCircle2,
    description: "Successfully finished",
  },
  {
    title: "Average Rating",
    value: "4.9",
    icon: Star,
    description: "Based on 87 reviews",
  },
  {
    title: "Total Earnings",
    value: "$5,820",
    icon: DollarSign,
    description: "Lifetime earnings",
  },
];

const recentBookings = [
  {
    customer: "John Doe",
    service: "AC Repair",
    date: "31 Jul 2026",
    status: "Completed",
  },
  {
    customer: "Sarah Smith",
    service: "Plumbing",
    date: "30 Jul 2026",
    status: "Pending",
  },
  {
    customer: "David Lee",
    service: "Electric Repair",
    date: "29 Jul 2026",
    status: "Accepted",
  },
];

const upcomingJobs = [
  {
    customer: "Emily Brown",
    service: "Cleaning",
    time: "10:00 AM",
    date: "01 Aug",
  },
  {
    customer: "Michael Scott",
    service: "Painting",
    time: "02:00 PM",
    date: "01 Aug",
  },
  {
    customer: "Alex Johnson",
    service: "AC Installation",
    time: "09:00 AM",
    date: "02 Aug",
  },
];

export default function TechnicianDashboardPage() {
  return (
    <div className="space-y-8">

      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Technician Dashboard
        </h1>

        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your work.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>

                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-3xl font-bold">{item.value}</div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Earnings</CardTitle>

            <CardDescription>
              Earnings overview for the past 6 months
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed text-muted-foreground">
              Monthly Earnings Chart
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Statistics</CardTitle>

            <CardDescription>
              Completed vs Pending bookings
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed text-muted-foreground">
              Booking Statistics Chart
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables */}

      <div className="grid gap-6 xl:grid-cols-2">

        {/* Recent Bookings */}

        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>

            <CardDescription>
              Your latest completed and pending bookings.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.customer}>
                    <TableCell>{booking.customer}</TableCell>

                    <TableCell>{booking.service}</TableCell>

                    <TableCell>{booking.date}</TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          booking.status === "Completed"
                            ? "default"
                            : booking.status === "Pending"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Upcoming Jobs */}

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Jobs</CardTitle>

            <CardDescription>
              Scheduled jobs coming soon.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {upcomingJobs.map((job) => (
                  <TableRow key={job.customer}>
                    <TableCell>{job.customer}</TableCell>

                    <TableCell>{job.service}</TableCell>

                    <TableCell>{job.time}</TableCell>

                    <TableCell>{job.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}