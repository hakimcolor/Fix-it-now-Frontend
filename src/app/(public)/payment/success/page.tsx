import Link from 'next/link';
import { CheckCircle2, ArrowRight, Clock } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

export default function PaymentSuccessPage() {
  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center py-10">
      <Card className="w-full max-w-2xl border-green-200 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>

          <CardTitle className="text-3xl font-bold text-green-700">
            Payment Successful!
          </CardTitle>

          <CardDescription className="mt-2 text-base">
            Your payment has been processed successfully. Thank you for your
            payment!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-muted/40 p-5">
            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 text-primary" />

              <div>
                <h3 className="font-semibold">What&apos;s Next?</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Your booking status has been updated to PAID. The technician
                  will now proceed with scheduling and completing your service.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-dashed p-5">
            <h4 className="mb-3 font-semibold">Booking Details</h4>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✅ Payment confirmed and recorded</li>
              <li>📧 Receipt sent to your email</li>
              <li>👷 Technician will start preparing for your service</li>
              <li>📱 Track your booking status in real-time</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/dashboard/my-bookings">
                View My Bookings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" className="flex-1">
              <Link href="/dashboard/my-payments">View Payment History</Link>
            </Button>
          </div>

          <div className="pt-4 text-center">
            <Button asChild variant="link">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
