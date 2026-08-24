'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { createPayment } from '@/app/(dashboard)/_actions/createPayment';

interface Props {
  bookingId: string;
}

export default function SSLCommerzButton({ bookingId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handlePayment = () => {
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

      toast.success(result.message || 'Payment initiated successfully.');
    });
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      disabled={isPending}
      onClick={handlePayment}
    >
      {isPending ? 'Processing…' : 'Pay with SSLCommerz'}
    </Button>
  );
}
