"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Calendar,
    Clock,
    CheckCircle2,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { serviceBooking } from "../_actions/serviceBooking";
import { toast } from "sonner";

interface BookingSlot {
    id: string;
    date: string;
    startsAt: string;
    endsAt: string;
    note?: string;
    isAvailable: boolean;
}

interface BookingModalProps {
    serviceId: string;
    slots: BookingSlot[];
}

export default function BookingModal({
    serviceId,
    slots,
}: BookingModalProps) {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [note, setNote] = useState("");

    const handleContinue = async () => {
        if (!selectedSlot) return;

        // console.log("Button clicked");

        try {
            const result = await serviceBooking({
                serviceId,
                note,
                bookingSlotIds: [selectedSlot],
            });

            if(result.success){
                toast.success("booking created successfully.");
                router.push("/dashboard/booking-success");
            }

            // console.log("Result:", result);
        } catch (error) {
            console.error("Booking error:", error);
        }

        // console.log({ note, selectedSlot, serviceId });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                setOpen(value);

                if (!value) {
                    setSelectedSlot(null);
                }
            }}
        >
            <DialogTrigger asChild>
                <Button className="w-full" size="lg">
                    Book This Service
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Select a Booking Slot</DialogTitle>

                    <DialogDescription>
                        Choose one available slot to continue.
                    </DialogDescription>
                </DialogHeader>

                <div className="max-h-[400px] space-y-3 overflow-y-auto pr-1">
                    {slots.length > 0 ? (
                        slots.map((slot) => {
                            const isSelected = selectedSlot === slot.id;

                            return (
                                <button
                                    key={slot.id}
                                    type="button"
                                    onClick={() => setSelectedSlot(slot.id)}
                                    className={`w-full rounded-xl border p-4 text-left transition-all duration-200
                    ${isSelected
                                            ? "border-green-600 bg-green-50 ring-2 ring-green-500 dark:border-green-500 dark:bg-green-950/30"
                                            : "border-border hover:border-green-500 hover:bg-muted/50"
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 font-semibold">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(slot.date).toLocaleDateString()}
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Clock className="h-4 w-4" />

                                                {new Date(slot.startsAt).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}

                                                -

                                                {new Date(slot.endsAt).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </div>

                                            {slot.note && (
                                                <p className="text-sm text-muted-foreground">
                                                    {slot.note}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {isSelected && (
                                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                                            )}

                                            <Badge
                                                className={
                                                    isSelected
                                                        ? "bg-green-600 text-white hover:bg-green-600"
                                                        : "bg-green-100 text-green-700 hover:bg-green-100"
                                                }
                                            >
                                                Available
                                            </Badge>
                                        </div>
                                    </div>
                                </button>
                            );
                        })
                    ) : (
                        <div className="rounded-lg border border-dashed py-12 text-center">
                            <p className="text-muted-foreground">
                                No available slots found.
                            </p>
                        </div>
                    )}
                </div>

                {/* Booking Note */}
                <form className="mt-4">
                    <label
                        htmlFor="note"
                        className="mb-2 block text-sm font-medium"
                    >
                        Booking Note
                    </label>

                    <textarea
                        id="note"
                        name="note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Tell the technician about your challenge in detail..."
                        rows={4}
                        maxLength={500}
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    />

                    <div className="mt-1 flex justify-end text-xs text-muted-foreground">
                        {note.length}/500
                    </div>
                </form>

                <Button
                    className="w-full"
                    disabled={!selectedSlot}
                    onClick={handleContinue}
                >
                    {selectedSlot ? "Continue with Selected Slot" : "Select a Slot"}
                </Button>
            </DialogContent>
        </Dialog>
    );
}