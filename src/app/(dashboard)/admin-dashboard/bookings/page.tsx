import { getAdminBookings } from '../../_actions/getAdminBookings';
import { BookingsTable } from '../../_components/BookingsTable';

export default async function AdminBookingPage() {
  const response = await getAdminBookings();
  const bookings = response?.data ?? [];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">Manage all customer bookings</p>
      </div>

      <BookingsTable data={bookings} />
    </div>
  );
}
