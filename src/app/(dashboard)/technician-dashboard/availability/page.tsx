import { getMyTechnicianProfile } from '../../_actions/getMyTechnicianProfile';
import WeeklyScheduleEditor from '../../_components/WeeklyScheduleEditor';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, Clock3, CheckCircle } from 'lucide-react';

export default async function AvailabilityPage() {
  const techProfile = await getMyTechnicianProfile();

  // Show current saved availability if present
  const availability = techProfile?.availability ?? {};

  const totalDays = Object.values(availability).filter(
    (slots) => Array.isArray(slots) && (slots as string[]).length > 0
  ).length;

  const totalSlots = Object.values(availability).reduce(
    (sum, slots) =>
      sum + (Array.isArray(slots) ? (slots as string[]).length : 0),
    0
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Availability</h1>
        <p className="mt-1 text-muted-foreground">
          Set your weekly working schedule so customers know when to book you.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <CalendarDays className="h-8 w-8 text-primary opacity-80" />
            <div>
              <p className="text-sm text-muted-foreground">Active Days</p>
              <p className="text-3xl font-bold">{totalDays}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <Clock3 className="h-8 w-8 text-primary opacity-80" />
            <div>
              <p className="text-sm text-muted-foreground">Total Time Slots</p>
              <p className="text-3xl font-bold">{totalSlots}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <CheckCircle className="h-8 w-8 text-emerald-500 opacity-80" />
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-xl font-bold">
                {totalDays > 0 ? 'Active' : 'Not Set'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current saved schedule preview */}
      {Object.keys(availability).length > 0 && totalSlots > 0 && (
        <Card>
          <CardContent className="p-5">
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              Current saved schedule
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(availability).map(([day, slots]) => {
                if (!Array.isArray(slots) || slots.length === 0) return null;
                return (
                  <div
                    key={day}
                    className="rounded-lg border bg-muted/40 px-3 py-2 text-sm"
                  >
                    <span className="font-medium capitalize">{day}:</span>{' '}
                    <span className="text-muted-foreground">
                      {(slots as string[]).join(', ')}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly schedule editor */}
      <WeeklyScheduleEditor />
    </div>
  );
}
