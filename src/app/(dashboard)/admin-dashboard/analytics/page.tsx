



// app/admin/analytics/page.tsx
"use client"

import {
  Users,
  Wrench,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Briefcase,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AnalyticsAdminPage() {
  const stats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      description: "Customers + Technicians",
    },
    {
      title: "Active Technicians",
      value: "1,284",
      change: "+8.2%",
      trend: "up",
      icon: Wrench,
      description: "Verified professionals",
    },
    {
      title: "Bookings this month",
      value: "3,492",
      change: "+18.7%",
      trend: "up",
      icon: CalendarCheck,
      description: "Completed + Upcoming",
    },
    {
      title: "Platform Revenue",
      value: "$48,290",
      change: "-2.4%",
      trend: "down",
      icon: DollarSign,
      description: "Commission earned",
    },
  ]

  const topServices = [
    { name: "Plumbing", bookings: 842, revenue: "$12,450" },
    { name: "Electrical", bookings: 721, revenue: "$11,280" },
    { name: "HVAC", bookings: 598, revenue: "$9,870" },
    { name: "Cleaning", bookings: 534, revenue: "$6,420" },
    { name: "Painting", bookings: 412, revenue: "$5,890" },
  ]

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Platform performance overview for FixItNow
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/60">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="rounded-lg bg-primary/10 p-2">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="mt-1 flex items-center gap-2 text-xs">
                <Badge
                  variant="secondary"
                  className={
                    stat.trend === "up"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                      : "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/10"
                  }
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3" />
                  )}
                  {stat.change}
                </Badge>
                <span className="text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts + Top Services */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Main Chart Placeholder */}
        <Card className="lg:col-span-4 border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Bookings Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[280px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Chart placeholder
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Integrate Recharts / Chart.js here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Services */}
        <Card className="lg:col-span-3 border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Top Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{service.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {service.bookings} bookings
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">{service.revenue}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New technician verified", time: "2 min ago", user: "Marcus Chen" },
                { action: "Booking completed", time: "18 min ago", user: "Sarah Miller" },
                { action: "User reported issue", time: "1 hour ago", user: "James Wilson" },
                { action: "Service category updated", time: "3 hours ago", user: "Admin" },
                { action: "Payment processed", time: "5 hours ago", user: "Emily Davis" },
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.user}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { label: "Booking Completion Rate", value: 94 },
              { label: "Technician Response Rate", value: 88 },
              { label: "Customer Satisfaction", value: 96 },
              { label: "Dispute Resolution", value: 91 },
            ].map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{metric.label}</span>
                  <span className="font-medium">{metric.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}