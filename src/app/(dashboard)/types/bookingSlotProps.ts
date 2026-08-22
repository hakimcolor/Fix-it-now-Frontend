export interface BookingSlot {
  id: string;

  serviceId: string;
  bookingId: string | null;

  date: string; // ISO Date

  startsAt: string; // ISO DateTime
  endsAt: string; // ISO DateTime

  isAvailable: boolean;
  isBooked: boolean;

  note: string | null;

  bookingDeadline: string | null;

  maxBookings: number;
  bookedCount: number;

  createdAt: string;
  updatedAt: string;
}