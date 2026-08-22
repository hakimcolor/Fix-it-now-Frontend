import Link from 'next/link';
import { XCircle, AlertTriangle, ArrowLeft } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

export default function PaymentCancelPage() {
  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center py-10">
      <Card className="w-full max-w-2xl border-red-200 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>

          <CardTitle className="text-3xl font-bold text-red-700">
            Payment Cancelled
          </CardTitle>

          <CardDescription className="mt-2 text-base">
            Your payment was not completed. No charges have been made to your
            account.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-muted/40 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 text-orange-500" />

              <div>
                <h3 className="font-semibold">What Happened?</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  The payment process was interrupted or cancelled. Your booking
                  is still in ACCEPTED status and awaiting payment.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-dashed p-5">
            <h4 className="mb-3 font-semibold">Common Reasons</h4>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>❌ Payment was cancelled by you</li>
              <li>💳 Card details were incorrect or expired</li>
              <li>🏦 Insufficient funds in your account</li>
              <li>🔒 Payment gateway connection issue</li>
            </ul>
          </div>

          <div className="rounded-lg bg-secondary/20 p-4">
            <p className="text-sm">
              <strong>Note:</strong> You can retry the payment from your
              bookings page. If you continue experiencing issues, please contact
              our support team.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/dashboard/my-bookings">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Bookings
              </Link>
            </Button>

            <Button asChild variant="outline" className="flex-1">
              <Link href="/help">Get Help</Link>
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
