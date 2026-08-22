// import React from 'react'

// export default function AdminDashboardHome() {
//   return (
//     <div>AdminDashboardHome</div>
//   )
// }














import {
  Users,
  Wrench,
  CalendarCheck,
  DollarSign,
  Activity,
  Clock3,
  TrendingUp,
  UserCheck,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingStatusChart from "../_components/BookingStatusChart";
import RevenueLineChart from "../_components/RevenueLineChart";

export default function AdminDashboardHome() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Monitor users, bookings, services and platform performance.
        </p>
      </div>

      {/* ================= Stats ================= */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <h2 className="text-3xl font-bold">1,254</h2>
            </div>

            <Users className="h-10 w-10 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Bookings
              </p>
              <h2 className="text-3xl font-bold">845</h2>
            </div>

            <CalendarCheck className="h-10 w-10 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Active Services
              </p>
              <h2 className="text-3xl font-bold">87</h2>
            </div>

            <Wrench className="h-10 w-10 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Revenue
              </p>
              <h2 className="text-3xl font-bold">$15,420</h2>
            </div>

            <DollarSign className="h-10 w-10 text-primary" />
          </CardContent>
        </Card>
      </div>

      {/* ================= Charts ================= */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/*  Booking Status Pie Chart */}
        <BookingStatusChart />
        {/* Revenue Line Chart */}
        <RevenueLineChart />

      </div>

      {/* ================= Recent Data ================= */}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Latest Bookings</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">AC Repair</p>
                <p className="text-sm text-muted-foreground">
                  John → Mike
                </p>
              </div>

              <Clock3 className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Home Cleaning</p>
                <p className="text-sm text-muted-foreground">
                  Sarah → Alex
                </p>
              </div>

              <Clock3 className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Painting</p>
                <p className="text-sm text-muted-foreground">
                  David → Ryan
                </p>
              </div>

              <Clock3 className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <UserCheck className="text-primary" />
              <div>
                <p className="font-medium">John Smith</p>
                <p className="text-sm text-muted-foreground">
                  Customer • Joined Today
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <UserCheck className="text-primary" />
              <div>
                <p className="font-medium">Michael Brown</p>
                <p className="text-sm text-muted-foreground">
                  Technician • Joined Today
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <UserCheck className="text-primary" />
              <div>
                <p className="font-medium">Emily Davis</p>
                <p className="text-sm text-muted-foreground">
                  Customer • Joined Yesterday
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= Platform Overview ================= */}

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Active Technicians
              </p>
              <h2 className="text-2xl font-bold">128</h2>
            </div>

            <Activity className="h-9 w-9 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Booking Success Rate
              </p>
              <h2 className="text-2xl font-bold">94%</h2>
            </div>

            <TrendingUp className="h-9 w-9 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Pending Verifications
              </p>
              <h2 className="text-2xl font-bold">12</h2>
            </div>

            <UserCheck className="h-9 w-9 text-primary" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}