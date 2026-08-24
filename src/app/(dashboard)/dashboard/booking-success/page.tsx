import Link from 'next/link';
import { CheckCircle2, ArrowRight, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function BookingSuccessPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="space-y-6 py-12">
          <div className="flex justify-center">
            <div className="rounded-full bg-emerald-100 p-5">
              <CheckCircle2 className="h-14 w-14 text-emerald-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground">
              Your booking has been confirmed. The technician will be in touch
              shortly.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button asChild>
              <Link href="/dashboard/my-bookings">
                <CalendarDays className="mr-2 h-4 w-4" />
                View My Bookings
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/services">
                Browse More Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
