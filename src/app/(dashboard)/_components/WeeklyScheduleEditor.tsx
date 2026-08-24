'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Save, Plus, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  updateAvailability,
  WeeklyAvailability,
} from '../_actions/updateAvailability';

const DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;
type Day = (typeof DAYS)[number];

const DAY_LABELS: Record<Day, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

type DayState = {
  enabled: boolean;
  slots: string[]; // e.g. ["09:00-12:00", "14:00-18:00"]
};

const DEFAULT_SCHEDULE: Record<Day, DayState> = {
  monday: { enabled: true, slots: ['09:00-12:00', '14:00-18:00'] },
  tuesday: { enabled: true, slots: ['09:00-12:00', '14:00-18:00'] },
  wednesday: { enabled: true, slots: ['09:00-12:00'] },
  thursday: { enabled: true, slots: ['14:00-18:00'] },
  friday: { enabled: true, slots: ['09:00-12:00', '14:00-18:00'] },
  saturday: { enabled: true, slots: ['10:00-15:00'] },
  sunday: { enabled: false, slots: [] },
};

export default function WeeklyScheduleEditor() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [schedule, setSchedule] =
    useState<Record<Day, DayState>>(DEFAULT_SCHEDULE);

  const toggleDay = (day: Day, enabled: boolean) => {
    setSchedule((prev) => ({ ...prev, [day]: { ...prev[day], enabled } }));
  };

  const addSlot = (day: Day) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], slots: [...prev[day].slots, '09:00-17:00'] },
    }));
  };

  const removeSlot = (day: Day, idx: number) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, i) => i !== idx),
      },
    }));
  };

  const updateSlot = (day: Day, idx: number, value: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((s, i) => (i === idx ? value : s)),
      },
    }));
  };

  const handleSave = () => {
    startTransition(async () => {
      // Build payload — only include enabled days with their slots
      const availability: WeeklyAvailability = {};
      for (const day of DAYS) {
        availability[day] = schedule[day].enabled ? schedule[day].slots : [];
      }

      const result = await updateAvailability(availability);
      if (result.success) {
        toast.success(result.message || 'Availability saved.');
        router.refresh();
      } else {
        toast.error(result.message || 'Failed to save availability.');
      }
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>
            Set your available time slots for each day.
          </CardDescription>
        </div>
        <Button onClick={handleSave} disabled={isPending} className="shrink-0">
          <Save className="mr-2 h-4 w-4" />
          {isPending ? 'Saving…' : 'Save Schedule'}
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {DAYS.map((day) => {
          const state = schedule[day];
          return (
            <div
              key={day}
              className={`rounded-xl border p-4 transition-colors ${
                state.enabled
                  ? 'border-border bg-background'
                  : 'border-dashed bg-muted/30'
              }`}
            >
              {/* Day header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={state.enabled}
                    onCheckedChange={(v) => toggleDay(day, v)}
                    aria-label={`Toggle ${DAY_LABELS[day]}`}
                  />
                  <span
                    className={`font-medium ${
                      state.enabled
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {DAY_LABELS[day]}
                  </span>
                </div>

                {state.enabled && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addSlot(day)}
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" />
                    Add Slot
                  </Button>
                )}
              </div>

              {/* Time slots */}
              {state.enabled && state.slots.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {state.slots.map((slot, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 rounded-lg border bg-background px-2 py-1"
                    >
                      <Input
                        value={slot}
                        onChange={(e) => updateSlot(day, idx, e.target.value)}
                        placeholder="09:00-12:00"
                        className="h-7 w-32 border-0 p-0 text-sm focus-visible:ring-0"
                      />
                      <button
                        type="button"
                        onClick={() => removeSlot(day, idx)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove slot"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {state.enabled && state.slots.length === 0 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  No slots added. Click &quot;Add Slot&quot; to add a time
                  range.
                </p>
              )}

              {!state.enabled && (
                <p className="mt-2 text-xs text-muted-foreground">Day off</p>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
