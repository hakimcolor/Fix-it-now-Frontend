'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  PlayCircle,
  Trophy,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { updateBookingStatus } from '../_actions/updateBookingStatus';

export type BookingStatus =
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
  paymentStatus?: string;
}

const statusStyle: Record<string, string> = {
  REQUESTED: 'bg-amber-100  text-amber-700  border-amber-200',
  ACCEPTED: 'bg-blue-100   text-blue-700   border-blue-200',
  DECLINED: 'bg-red-100    text-red-700    border-red-200',
  PAID: 'bg-violet-100 text-violet-700 border-violet-200',
  IN_PROGRESS: 'bg-orange-100 text-orange-700 border-orange-200',
  COMPLETED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  CANCELLED: 'bg-gray-100   text-gray-600   border-gray-200',
};

const statusLabel: Record<string, string> = {
  REQUESTED: 'Requested',
  ACCEPTED: 'Accepted',
  DECLINED: 'Declined',
  PAID: 'Paid',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export default function BookingActionButtons({
  bookingId,
  currentStatus,
  paymentStatus,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] =
    useState<BookingStatus>(currentStatus);

  const handle = (status: BookingStatus) => {
    setOptimisticStatus(status); // immediate UI update
    startTransition(async () => {
      try {
        await updateBookingStatus(bookingId, { status });
        toast.success(`Status changed to ${statusLabel[status]}.`);
        router.refresh();
      } catch {
        setOptimisticStatus(currentStatus); // revert on error
        toast.error('Failed to update status.');
      }
    });
  };

  const badge = (
    <Badge variant="outline" className={statusStyle[optimisticStatus] ?? ''}>
      {statusLabel[optimisticStatus] ?? optimisticStatus}
    </Badge>
  );

  // Terminal states — nothing to do
  if (['COMPLETED', 'DECLINED', 'CANCELLED'].includes(optimisticStatus)) {
    return badge;
  }

  // Payment cleared = PAID or paymentStatus is PAID/COMPLETED
  const paymentCleared =
    optimisticStatus === 'PAID' ||
    paymentStatus === 'PAID' ||
    paymentStatus === 'COMPLETED';

  // Build available actions based on current status
  const actions: {
    label: string;
    status: BookingStatus;
    icon: React.ReactNode;
    danger?: boolean;
  }[] = [];

  if (optimisticStatus === 'REQUESTED') {
    actions.push(
      {
        label: 'Accept',
        status: 'ACCEPTED',
        icon: <CheckCircle2 className="h-4 w-4 text-blue-600" />,
      },
      {
        label: 'Decline',
        status: 'DECLINED',
        icon: <XCircle className="h-4 w-4 text-red-500" />,
        danger: true,
      }
    );
  }

  if (optimisticStatus === 'ACCEPTED' || optimisticStatus === 'PAID') {
    actions.push({
      label: 'Mark In Progress',
      status: 'IN_PROGRESS',
      icon: <PlayCircle className="h-4 w-4 text-orange-500" />,
    });
  }

  if (optimisticStatus === 'IN_PROGRESS') {
    // Only allow Complete if payment is cleared
    if (paymentCleared) {
      actions.push({
        label: 'Mark Completed',
        status: 'COMPLETED',
        icon: <Trophy className="h-4 w-4 text-emerald-600" />,
      });
    }
  }

  if (actions.length === 0) return badge;

  return (
    <div className="flex items-center gap-2">
      {badge}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            disabled={isPending}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Change Status
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actions.map((a) => (
            <DropdownMenuItem
              key={a.status}
              onClick={() => handle(a.status)}
              className={
                a.danger ? 'text-destructive focus:text-destructive' : ''
              }
            >
              {a.icon}
              <span className="ml-2">{a.label}</span>
            </DropdownMenuItem>
          ))}
          {optimisticStatus === 'IN_PROGRESS' && !paymentCleared && (
            <DropdownMenuItem
              disabled
              className="text-xs text-muted-foreground"
            >
              <Trophy className="h-4 w-4 mr-2 opacity-40" />
              Complete (awaiting payment)
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
