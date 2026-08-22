import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeDollarSign,
  Calendar,
  CheckCircle2,
  DollarSign,
  Wallet,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const stats = [
  {
    title: "Total Earnings",
    value: "$54,280",
    icon: DollarSign,
    color: "text-green-600",
    description: "Lifetime earnings",
  },
  {
    title: "This Month",
    value: "$12,540",
    icon: Calendar,
    color: "text-blue-600",
    description: "August earnings",
  },
  {
    title: "Pending Payout",
    value: "$2,350",
    icon: Wallet,
    color: "text-orange-500",
    description: "Waiting for payout",
  },
  {
    title: "Completed Jobs",
    value: "87",
    icon: CheckCircle2,
    color: "text-emerald-600",
    description: "Successfully completed",
  },
];

const recentTransactions = [
  {
    id: "#BK-1032",
    customer: "John Doe",
    service: "AC Repair",
    amount: "$1,500",
    status: "Paid",
  },
  {
    id: "#BK-1031",
    customer: "Alex Smith",
    service: "Pipe Installation",
    amount: "$2,200",
    status: "Paid",
  },
  {
    id: "#BK-1028",
    customer: "Sarah Khan",
    service: "Electrical Repair",
    amount: "$900",
    status: "Pending",
  },
];

export default function EarningsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Earnings
        </h1>

        <p className="mt-2 text-muted-foreground">
          Monitor your income, completed jobs, and payout progress.
        </p>
      </div>

      {/* Stats */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </CardTitle>
                </div>

                <div className="rounded-lg bg-muted p-2">
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
              </CardHeader>

              <CardContent>
                <div className="text-3xl font-bold">
                  {item.value}
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Main Content */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Earnings Summary */}

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Earnings Summary</CardTitle>

            <CardDescription>
              Overview of your financial performance.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl border p-5">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                  Gross Earnings
                </div>

                <p className="mt-3 text-3xl font-bold">
                  $60,000
                </p>
              </div>

              <div className="rounded-xl border p-5">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                  Platform Fees
                </div>

                <p className="mt-3 text-3xl font-bold">
                  $5,720
                </p>
              </div>
            </div>

            <div className="rounded-xl border p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">
                    Available Balance
                  </p>

                  <p className="mt-2 text-4xl font-bold">
                    $48,560
                  </p>
                </div>

                <BadgeDollarSign className="h-10 w-10 text-green-600" />
              </div>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm">
                  <span>Payout Progress</span>

                  <span>80%</span>
                </div>

                <Progress value={80} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Summary */}

        <Card>
          <CardHeader>
            <CardTitle>Quick Summary</CardTitle>

            <CardDescription>
              Current account status
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Last Payout
              </p>

              <p className="mt-1 text-xl font-semibold">
                28 July 2026
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Next Estimated Payout
              </p>

              <p className="mt-1 text-xl font-semibold">
                07 August 2026
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Transactions
              </p>

              <p className="mt-1 text-xl font-semibold">
                104
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Average Per Job
              </p>

              <p className="mt-1 text-xl font-semibold">
                $624
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>

          <CardDescription>
            Latest payments received from completed bookings.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold">
                    {transaction.service}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {transaction.customer}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {transaction.id}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold">
                    {transaction.amount}
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      transaction.status === "Paid"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}