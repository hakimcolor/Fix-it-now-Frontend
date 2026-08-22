


"use client";

import { Button } from "@/components/ui/button";
import { createPayment } from "@/app/(dashboard)/_actions/createPayment";
import { useTransition } from "react";

interface SSLCommerzButtonProps {
  bookingId: string;
  amount: number;
}

export default function SSLCommerzButton({
  bookingId,
  amount,
}: SSLCommerzButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handlePayment = () => {
    startTransition(async () => {
      const result = await createPayment({
        bookingId,
        amount,
        method: "CARD",
        provider: "SSLCOMMERZ",
        currency: "USD",
      });

      if (!result.success) {
        alert(result.message);
        return;
      }

      if (result.data?.paymentUrl) {
        window.location.href = result.data.paymentUrl;
      }
    });
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      disabled={isPending}
      onClick={handlePayment}
    >
      {isPending ? "Redirecting..." : "Pay with SSLCommerz"}
    </Button>
  );
}