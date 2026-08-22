

// "use client";

// import { Button } from "@/components/ui/button";
// import { createPayment } from "@/app/(dashboard)/_actions/createPayment";
// import { useTransition } from "react";
// import { toast } from "sonner";
// import { createCheckoutSession } from "@/app/(dashboard)/_actions/checkoutPayment";

// interface StripeButtonProps {
//     bookingId: string;
//     amount: number;
// }

// export default function StripeButton({
//     bookingId,
//     amount,
// }: StripeButtonProps) {
//     const [isPending, startTransition] = useTransition();

//     const handlePayment = () => {
//         startTransition(async () => {
//             const result = await createPayment({
//                 bookingId,
//                 amount,
//                 method: "CARD",
//                 provider: "STRIPE",
//                 currency: "USD",
//             });

//             if (!result.success) {
//                 toast.error(result.message);
//                 return;
//             }
//             if (result.success) {
//                 const checkout = await createCheckoutSession({
//                     bookingId: bookingId,
//                 });

//                 if (checkout.success && checkout.data) {
//                     window.location.href = checkout.data;
//                     toast.success(result.message);
//                 }
//                 console.log(checkout, "from stripe button checkout block")
//                 return;
//             }

//             // Backend should return checkout URL
//             // if (result.data?.paymentUrl) {
//             //     window.location.href = result.data.paymentUrl;
//             // }
//         });
//     };

//     return (
//         <Button
//             className="w-full"
//             disabled={isPending}
//             onClick={handlePayment}
//         >
//             {isPending ? "Redirecting..." : "Pay with Stripe"}
//         </Button>
//     );
// }




















"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { createPayment } from "@/app/(dashboard)/_actions/createPayment";
import { createCheckoutSession } from "@/app/(dashboard)/_actions/checkoutPayment";

interface StripeButtonProps {
    bookingId: string;
    amount: number;
}

export default function StripeButton({
    bookingId,
    amount,
}: StripeButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handlePayment = () => {
        startTransition(async () => {
            try {
                // Step 1: Create payment record
                const paymentResult = await createPayment({
                    bookingId,
                    amount,
                    method: "CARD",
                    provider: "STRIPE",
                    currency: "USD",
                });

                if (!paymentResult.success) {
                    toast.error(paymentResult.message);
                    return;
                }

                // Step 2: Create Stripe Checkout Session
                const checkoutResult = await createCheckoutSession({
                    bookingId,
                });

                if (!checkoutResult.success) {
                    toast.error(checkoutResult.message);
                    return;
                }

                if (!checkoutResult.data) {
                    toast.error("Stripe checkout URL not found.");
                    return;
                }
                console.log(checkoutResult, "from stripe button checkout block")
                // Step 3: Redirect to Stripe Checkout
                window.location.assign(checkoutResult.data);
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong. Please try again.");
            }
        });
    };

    return (
        <Button
            onClick={handlePayment}
            disabled={isPending}
            className="w-full"
        >
            {isPending ? "Redirecting to Stripe..." : "Pay with Stripe"}
        </Button>
    );
}