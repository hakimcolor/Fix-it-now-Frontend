'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { CalendarDays, Clock, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { updateAvailability } from '../_actions/updateAvailability';

const schema = z
  .object({
    serviceId: z.string().min(1, 'Service is required'),
    date: z.string().min(1, 'Date is required'),
    startsAt: z.string().min(1, 'Start time is required'),
    endsAt: z.string().min(1, 'End time is required'),
    bookingDeadline: z.string().min(1, 'Booking deadline is required'),
    maxBookings: z.number().min(1, 'At least 1 booking'),
    isAvailable: z.boolean(),
    note: z.string().optional(),
  })
  .refine((d) => d.endsAt > d.startsAt, {
    message: 'End time must be after start time',
    path: ['endsAt'],
  })
  .refine((d) => d.bookingDeadline <= d.date, {
    message: 'Booking deadline must be on or before the slot date',
    path: ['bookingDeadline'],
  });

type FormValues = z.infer<typeof schema>;

interface Service {
  id: string;
  title: string;
}

interface Props {
  services: Service[];
}

export default function AvailabilityScheduler({ services }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isAvailable, setIsAvailable] = useState(true);

  const today = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      isAvailable: true,
      maxBookings: 1,
      date: today,
      bookingDeadline: today,
    },
  });

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      const result = await updateAvailability({
        ...data,
        isBooked: false,
      });

      if (result.success) {
        toast.success(result.message || 'Availability slot added.');
        reset({
          serviceId: data.serviceId,
          isAvailable: true,
          maxBookings: 1,
          date: today,
          bookingDeadline: today,
          startsAt: '',
          endsAt: '',
          note: '',
        });
        router.refresh();
      } else {
        toast.error(result.message || 'Failed to add availability slot.');
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add Availability Slot
        </CardTitle>
        <CardDescription>
          Set a time window when customers can book you for a specific service.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Service */}
          <div className="space-y-1.5">
            <Label htmlFor="serviceId">Service</Label>
            {services.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No services found. Add a service first.
              </p>
            ) : (
              <Select
                onValueChange={(v) => setValue('serviceId', v)}
                defaultValue=""
              >
                <SelectTrigger id="serviceId">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {errors.serviceId && (
              <p className="text-xs text-destructive">
                {errors.serviceId.message}
              </p>
            )}
          </div>

          {/* Date row */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="date" className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                Slot Date
              </Label>
              <Input
                id="date"
                type="date"
                min={today}
                {...register('date')}
                onChange={(e) => {
                  register('date').onChange(e);
                  // keep deadline ≤ date
                  const deadline = watch('bookingDeadline');
                  if (deadline > e.target.value) {
                    setValue('bookingDeadline', e.target.value);
                  }
                }}
              />
              {errors.date && (
                <p className="text-xs text-destructive">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="bookingDeadline">Booking Deadline</Label>
              <Input
                id="bookingDeadline"
                type="date"
                min={today}
                {...register('bookingDeadline')}
              />
              {errors.bookingDeadline && (
                <p className="text-xs text-destructive">
                  {errors.bookingDeadline.message}
                </p>
              )}
            </div>
          </div>

          {/* Time row */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="startsAt" className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Start Time
              </Label>
              <Input id="startsAt" type="time" {...register('startsAt')} />
              {errors.startsAt && (
                <p className="text-xs text-destructive">
                  {errors.startsAt.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="endsAt">End Time</Label>
              <Input id="endsAt" type="time" {...register('endsAt')} />
              {errors.endsAt && (
                <p className="text-xs text-destructive">
                  {errors.endsAt.message}
                </p>
              )}
            </div>
          </div>

          {/* Max bookings + availability toggle */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="maxBookings">Max Bookings</Label>
              <Input
                id="maxBookings"
                type="number"
                min={1}
                {...register('maxBookings', { valueAsNumber: true })}
              />
              {errors.maxBookings && (
                <p className="text-xs text-destructive">
                  {errors.maxBookings.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Available</p>
                <p className="text-xs text-muted-foreground">
                  Open for bookings
                </p>
              </div>
              <Switch
                checked={isAvailable}
                onCheckedChange={(v) => {
                  setIsAvailable(v);
                  setValue('isAvailable', v);
                }}
              />
            </div>
          </div>

          {/* Note */}
          <div className="space-y-1.5">
            <Label htmlFor="note">Note (optional)</Label>
            <Input
              id="note"
              {...register('note')}
              placeholder="e.g. Available for AC repair only"
            />
          </div>

          <Button type="submit" disabled={isPending || services.length === 0}>
            {isPending ? 'Saving…' : 'Add Slot'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
