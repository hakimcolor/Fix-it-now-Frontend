// import React from 'react'

// export default function ServiseBookingSlotsPage() {
//   return (
//     <div>ServiseBookingSlotsPage</div>
//   )
// }














import AddBookingSlotForm from "@/app/(dashboard)/_components/AddBookingSlotForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{
    serviceId: string;
  }>;
};

export default async function AddServiceBookingSlotspage({
  params,
}: Props) {
  const { serviceId } = await params;

  return (
    <section className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Add Booking Slot
          </h1>

          <p className="mt-2 text-muted-foreground">
            Create an availability slot for customers to book this
            service.
          </p>
        </div>

        <Link
          href="/dashboard/technician/services"
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <div className="rounded-xl border bg-background p-6 shadow-sm">
        <AddBookingSlotForm serviceId={serviceId} />
      </div>
    </section>
  );
}