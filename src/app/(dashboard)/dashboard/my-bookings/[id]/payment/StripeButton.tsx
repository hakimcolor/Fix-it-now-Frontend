'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPayment } from '@/app/(dashboard)/_actions/createPayment';

export default function StripeButton({ bookingId }: { bookingId: string }) {
  const [isPending, startTransition] = useTransition();

  const handle = () => {
    startTransition(async () => {
      const result = await createPayment(bookingId);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      if (result.data?.paymentUrl) {
        window.location.href = result.data.paymentUrl;
        return;
      }
      toast.success(result.message || 'Payment record created.');
    });
  };

  return (
    <Button className="w-full" disabled={isPending} onClick={handle}>
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing…
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          Pay with Card
        </>
      )}
    </Button>
  );
}
