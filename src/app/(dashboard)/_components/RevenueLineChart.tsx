'use client';

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Booking {
  createdAt: string;
  paymentStatus: string;
  service?: { price?: number };
}

interface Props {
  bookings: Booking[];
}

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function RevenueLineChart({ bookings }: Props) {
  const monthly = Array.from({ length: 12 }, (_, i) => ({
    month: MONTH_LABELS[i],
    revenue: 0,
  }));

  bookings.forEach((b) => {
    if (b.paymentStatus !== 'PAID' && b.paymentStatus !== 'COMPLETED') return;
    const m = new Date(b.createdAt).getMonth();
    monthly[m].revenue += Number(b.service?.price) || 0;
  });

  // only render months that have at least one booking
  const currentMonth = new Date().getMonth();
  const data = monthly.slice(0, currentMonth + 1);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
      </CardHeader>
      <CardContent className="h-[290px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              className="text-xs"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : `${v}`)}
              className="text-xs"
            />
            <Tooltip
              formatter={(value) => [
                `${Number(value).toLocaleString()}`,
                'Revenue',
              ]}
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid hsl(var(--border))',
                backgroundColor: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ r: 4, fill: 'hsl(var(--primary))' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
