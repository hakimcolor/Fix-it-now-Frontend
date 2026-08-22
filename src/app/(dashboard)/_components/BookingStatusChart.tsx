"use client";

import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const bookingData = [
  {
    name: "Completed",
    value: 420,
    color: "#22c55e",
  },
  {
    name: "Pending",
    value: 120,
    color: "#f59e0b",
  },
  {
    name: "Accepted",
    value: 150,
    color: "#3b82f6",
  },
  {
    name: "Cancelled",
    value: 85,
    color: "#ef4444",
  },
  {
    name: "In Progress",
    value: 70,
    color: "#8b5cf6",
  },
];

export default function BookingStatusChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Booking Status Overview</CardTitle>
      </CardHeader>

      <CardContent className="h-[290px] flex items-center justify-center text-muted-foreground">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={bookingData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={3}
              strokeWidth={2}
            >
              {bookingData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => [
                `${value} bookings`,
                name,
              ]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid hsl(var(--border))",
                backgroundColor: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
              }}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}