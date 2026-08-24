'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { updateBookingStatus } from '../_actions/updateBookingStatus';
import { bookingStatusConfig } from '../dashboard/my-bookings/config/bookingStatusConfig';

type BookingStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'PAID'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

interface Props {
  bookingId: string;
  currentStatus: BookingStatus;
}

export default function BookingActionButtons({
  bookingId,
  currentStatus,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAction = async (status: BookingStatus) => {
    setLoading(true);
    try {
      await updateBookingStatus(bookingId, { status });
      toast.success('Booking status updated.');
      router.refresh();
    } catch {
      toast.error('Failed to update booking status.');
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = (
    <Badge
      variant="outline"
      className={
        bookingStatusConfig[currentStatus as keyof typeof bookingStatusConfig]
          ?.className
      }
    >
      {bookingStatusConfig[currentStatus as keyof typeof bookingStatusConfig]
        ?.label ?? currentStatus}
    </Badge>
  );

  // REQUESTED → Accept or Decline
  if (currentStatus === 'REQUESTED') {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {statusBadge}
        <Button
          size="sm"
          disabled={loading}
          onClick={() => handleAction('ACCEPTED')}
        >
          Accept
        </Button>
        <Button
          size="sm"
          variant="destructive"
          disabled={loading}
          onClick={() => handleAction('DECLINED')}
        >
          Decline
        </Button>
      </div>
    );
  }

  // PAID → Mark In-Progress
  if (currentStatus === 'PAID') {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {statusBadge}
        <Button
          size="sm"
          variant="secondary"
          disabled={loading}
          onClick={() => handleAction('IN_PROGRESS')}
        >
          Mark In-Progress
        </Button>
      </div>
    );
  }

  // IN_PROGRESS → Mark Completed
  if (currentStatus === 'IN_PROGRESS') {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {statusBadge}
        <Button
          size="sm"
          disabled={loading}
          onClick={() => handleAction('COMPLETED')}
        >
          Mark Completed
        </Button>
      </div>
    );
  }

  // All other statuses — just show the badge
  return statusBadge;
}
