'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { createCheckoutSession } from '@/app/(dashboard)/_actions/checkoutPayment';

export default function PayNowButton({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const result = await createCheckoutSession({ bookingId });
      if (result.success && result.data?.url) {
        window.location.href = result.data.url;
      } else {
        toast.error(result.message || 'Failed to create checkout session.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button size="sm" onClick={handlePay} disabled={loading}>
      <CreditCard className="mr-1.5 h-3.5 w-3.5" />
      {loading ? 'Redirecting…' : 'Pay Now'}
    </Button>
  );
}
