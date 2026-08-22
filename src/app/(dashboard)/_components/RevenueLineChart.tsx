"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const revenueData = [
  {
    month: "Jan",
    revenue: 8200,
  },
  {
    month: "Feb",
    revenue: 9600,
  },
  {
    month: "Mar",
    revenue: 11200,
  },
  {
    month: "Apr",
    revenue: 10500,
  },
  {
    month: "May",
    revenue: 12800,
  },
  {
    month: "Jun",
    revenue: 14100,
  },
  {
    month: "Jul",
    revenue: 15420,
  },
  {
    month: "Aug",
    revenue: 16800,
  },
];

export default function RevenueLineChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
      </CardHeader>

      <CardContent className="h-[290px] flex items-center justify-center text-muted-foreground">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-muted"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              className="text-xs"
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
              className="text-xs"
            />

            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid hsl(var(--border))",
                backgroundColor: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "hsl(var(--primary))",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}