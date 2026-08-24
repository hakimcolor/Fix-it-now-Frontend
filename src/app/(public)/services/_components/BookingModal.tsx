'use client';

import { useState, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Calendar, Clock, Phone, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { createBooking } from '@/app/(dashboard)/_actions/createBooking';

interface BookingModalProps {
  serviceId: string;
  isAuthenticated?: boolean;
}

export default function BookingModal({
  serviceId,
  isAuthenticated = false,
}: BookingModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleOpenChange = (value: boolean) => {
    if (value && !isAuthenticated) {
      router.push(`/login?from=${encodeURIComponent(pathname)}`);
      return;
    }
    setOpen(value);
    if (!value) {
      setScheduledDate('');
      setTimeSlot('');
      setContactNumber('');
    }
  };

  const handleBook = () => {
    if (!scheduledDate || !timeSlot || !contactNumber) {
      toast.error('Please fill in all fields.');
      return;
    }

    startTransition(async () => {
      const result = await createBooking({
        serviceId,
        scheduledDate,
        timeSlot,
        contactNumber,
      });

      if (result.success) {
        toast.success('Booking created successfully!');
        setOpen(false);
        router.push('/dashboard/my-bookings');
      } else {
        toast.error(result.message ?? 'Booking failed. Please try again.');
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          Book This Service
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book This Service</DialogTitle>
          <DialogDescription>
            Choose a date and time slot to schedule your booking.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Scheduled Date */}
          <div className="space-y-1.5">
            <Label htmlFor="scheduledDate" className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Scheduled Date
            </Label>
            <Input
              id="scheduledDate"
              type="date"
              min={today}
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
            />
          </div>

          {/* Time Slot */}
          <div className="space-y-1.5">
            <Label htmlFor="timeSlot" className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Time Slot
            </Label>
            <Input
              id="timeSlot"
              placeholder="e.g. 09:00-12:00"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Format: HH:MM-HH:MM (e.g. 09:00-12:00)
            </p>
          </div>

          {/* Contact Number */}
          <div className="space-y-1.5">
            <Label htmlFor="contactNumber" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              Contact Number
            </Label>
            <Input
              id="contactNumber"
              type="tel"
              placeholder="e.g. 01711223344"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          {/* Summary */}
          {scheduledDate && timeSlot && contactNumber && (
            <div className="rounded-lg border bg-muted/40 p-3 space-y-1.5 text-sm">
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircle2 className="h-4 w-4" />
                Ready to book
              </div>
              <p className="text-muted-foreground">
                Date:{' '}
                <span className="text-foreground font-medium">
                  {scheduledDate}
                </span>
              </p>
              <p className="text-muted-foreground">
                Time:{' '}
                <span className="text-foreground font-medium">{timeSlot}</span>
              </p>
              <p className="text-muted-foreground">
                Contact:{' '}
                <span className="text-foreground font-medium">
                  {contactNumber}
                </span>
              </p>
            </div>
          )}
        </div>

        <Button
          className="w-full"
          onClick={handleBook}
          disabled={isPending || !scheduledDate || !timeSlot || !contactNumber}
        >
          {isPending ? 'Booking…' : 'Confirm Booking'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
