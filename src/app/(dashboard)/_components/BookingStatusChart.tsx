'use client';

import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  bookings: { status: string }[];
}

const STATUS_COLORS: Record<string, string> = {
  COMPLETED: '#22c55e',
  REQUESTED: '#f59e0b',
  ACCEPTED: '#3b82f6',
  CANCELLED: '#ef4444',
  IN_PROGRESS: '#8b5cf6',
  DECLINED: '#f97316',
  PAID: '#06b6d4',
};

export default function BookingStatusChart({ bookings }: Props) {
  const counts = bookings.reduce<Record<string, number>>((acc, b) => {
    acc[b.status] = (acc[b.status] ?? 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(counts).map(([name, value]) => ({
    name,
    value,
    color: STATUS_COLORS[name] ?? '#94a3b8',
  }));

  if (data.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Booking Status Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[290px] items-center justify-center text-sm text-muted-foreground">
          No booking data yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Booking Status Overview</CardTitle>
      </CardHeader>
      <CardContent className="h-[290px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={3}
              strokeWidth={2}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} bookings`, name]}
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid hsl(var(--border))',
                backgroundColor: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
              }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
