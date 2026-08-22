"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createAvailability } from "@/app/(dashboard)/_actions/createAvailability";

interface AddBookingSlotFormProps {
  serviceId: string;
}

export default function AddBookingSlotForm({
  serviceId,
}: AddBookingSlotFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    bookingDeadline: "",
    maxBookings: 1,
    note: "",
    isAvailable: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: name === "maxBookings" ? Number(value) : value,
    }));
  };

  const combineDateTime = (date: string, time: string) => {
    return new Date(`${date}T${time}:00`).toISOString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.date ||
      !form.startTime ||
      !form.endTime ||
      !form.bookingDeadline
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    startTransition(async () => {
      const payload = {
        serviceId,
        date: new Date(form.date).toISOString(),
        startsAt: combineDateTime(form.date, form.startTime),
        endsAt: combineDateTime(form.date, form.endTime),
        bookingDeadline: new Date(form.bookingDeadline).toISOString(),
        maxBookings: form.maxBookings,
        note: form.note,
        isAvailable: form.isAvailable,
        isBooked: false,
      };

      const result = await createAvailability(
        payload
      );

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.refresh();

      setForm({
        date: "",
        startTime: "",
        endTime: "",
        bookingDeadline: "",
        maxBookings: 1,
        note: "",
        isAvailable: true,
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Date
          </label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Booking Deadline
          </label>

          <input
            type="datetime-local"
            name="bookingDeadline"
            value={form.bookingDeadline}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Starts At
          </label>

          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Ends At
          </label>

          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Maximum Bookings
          </label>

          <input
            type="number"
            min={1}
            name="maxBookings"
            value={form.maxBookings}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <div className="flex items-center gap-3 pt-8">
          <input
            id="isAvailable"
            type="checkbox"
            name="isAvailable"
            checked={form.isAvailable}
            onChange={handleChange}
            className="h-4 w-4"
          />

          <label
            htmlFor="isAvailable"
            className="text-sm font-medium"
          >
            Slot Available
          </label>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Note
        </label>

        <textarea
          name="note"
          rows={4}
          value={form.note}
          onChange={handleChange}
          placeholder="Optional note..."
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-orange-500 px-6 py-2 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Create Booking Slot"}
      </button>
    </form>
  );
}