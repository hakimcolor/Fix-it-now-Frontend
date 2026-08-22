

import Link from "next/link";

import {
  CalendarDays,
  Clock3,
  Wrench,
  CheckCircle2,
  CreditCard,
  Star,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TodayDate from "../_components/TodayDate";

const stats = [
  {
    title: "Total Bookings",
    value: 24,
    description: "All bookings",
    icon: CalendarDays,
  },
  {
    title: "Pending Bookings",
    value: 4,
    description: "Waiting for confirmation",
    icon: Clock3,
  },
  {
    title: "Active Services",
    value: 2,
    description: "Currently in progress",
    icon: Wrench,
  },
  {
    title: "Completed Jobs",
    value: 18,
    description: "Successfully completed",
    icon: CheckCircle2,
  },
  {
    title: "Total Spent",
    value: "$1,245",
    description: "Lifetime payments",
    icon: CreditCard,
  },
  {
    title: "Reviews Given",
    value: 12,
    description: "Submitted reviews",
    icon: Star,
  },
];

export default function CustomerDashboardHome() {


  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, John 👋
          </h1>

          <p className="mt-1 text-muted-foreground">
            <TodayDate />
          </p>
        </div>

        <Button asChild>
          <Link href="/services">
            Browse Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

      </div>

      {/* Stats */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.title}
              className="transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">

                <div>
                  <CardDescription>
                    {stat.title}
                  </CardDescription>

                  <CardTitle className="mt-2 text-3xl">
                    {stat.value}
                  </CardTitle>
                </div>

                <div className="rounded-full bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

    </div>
  );
}