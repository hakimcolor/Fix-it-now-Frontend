import { getMe } from '@/services/getMe';
import { getTechnicianServices } from '../../_actions/getTechnicianServices';
import AvailabilityScheduler from '../../_components/AvailabilityScheduler';
import AvailabilityRules from '../../_components/AvailabilityRules';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock3 } from 'lucide-react';

interface BookingSlot {
  id: string;
  date: string;
  startsAt: string;
  endsAt: string;
  isAvailable: boolean;
  isBooked: boolean;
  maxBookings: number;
  bookedCount: number;
  note?: string | null;
}

interface TechnicianService {
  id: string;
  title: string;
  bookingSlots: BookingSlot[];
}

export default async function AvailabilityPage() {
  const me = await getMe();
  const technicianId = me.data?.profile?.technicianProfile?.id;

  let services: TechnicianService[] = [];

  if (technicianId) {
    const res = await getTechnicianServices(technicianId);
    services = res?.data ?? [];
  }

  // Flatten all upcoming slots across all services
  const today = new Date().toISOString().split('T')[0];
  const upcomingSlots = services
    .flatMap((s) =>
      s.bookingSlots.map((slot) => ({ ...slot, serviceTitle: s.title }))
    )
    .filter((slot) => slot.date >= today)
    .sort(
      (a, b) =>
        a.date.localeCompare(b.date) || a.startsAt.localeCompare(b.startsAt)
    )
    .slice(0, 10);

  const totalSlots = services.flatMap((s) => s.bookingSlots).length;
  const bookedSlots = services
    .flatMap((s) => s.bookingSlots)
    .filter((slot) => slot.isBooked).length;

  const serviceOptions = services.map((s) => ({ id: s.id, title: s.title }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Availability</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your working schedule and booking slots.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Slots</p>
            <p className="text-3xl font-bold">{totalSlots}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Booked Slots</p>
            <p className="text-3xl font-bold">{bookedSlots}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Available Slots</p>
            <p className="text-3xl font-bold">{totalSlots - bookedSlots}</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Slot Form */}
      <AvailabilityScheduler services={serviceOptions} />

      {/* Upcoming Slots */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Slots</CardTitle>
          <CardDescription>
            Your next scheduled availability windows.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingSlots.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No upcoming slots. Add one above.
            </p>
          ) : (
            <div className="space-y-3">
              {upcomingSlots.map((slot) => (
                <div
                  key={slot.id}
                  className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{slot.serviceTitle}</p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {new Date(slot.date).toLocaleDateString(undefined, {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock3 className="h-3.5 w-3.5" />
                        {slot.startsAt} – {slot.endsAt}
                      </span>
                    </div>
                    {slot.note && (
                      <p className="text-xs text-muted-foreground">
                        {slot.note}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className="text-xs">
                      {slot.bookedCount}/{slot.maxBookings} booked
                    </Badge>
                    <Badge variant={slot.isBooked ? 'secondary' : 'default'}>
                      {slot.isBooked ? 'Booked' : 'Available'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rules panel */}
      <AvailabilityRules />
    </div>
  );
}
