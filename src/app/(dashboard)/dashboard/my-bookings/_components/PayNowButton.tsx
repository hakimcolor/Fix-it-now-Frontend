'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PayNowButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handle = () => {
    startTransition(async () => {
      // Navigate to the payment page where the user picks a method
      router.push(`/dashboard/my-bookings/${bookingId}/payment`);
    });
  };

  return (
    <Button size="sm" disabled={isPending} onClick={handle}>
      {isPending ? (
        <>
          <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
          Loading…
        </>
      ) : (
        <>
          <CreditCard className="mr-1.5 h-3.5 w-3.5" />
          Pay Now
        </>
      )}
    </Button>
  );
}
