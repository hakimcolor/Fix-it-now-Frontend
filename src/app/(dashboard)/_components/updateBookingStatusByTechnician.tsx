


// 'use client'

// import { updateBookingStatus } from '../_actions/updateBookingStatus'

// type BookingStatus =
//   | "REQUESTED"
//   | "ACCEPTED"
//   | "DECLINED"
//   | "PAID"
//   | "IN_PROGRESS"
//   | "COMPLETED"
//   | "CANCELLED";

// // Payload type
// interface UpdateBookingStatusPayload {
//   status: BookingStatus;
// }
// export default function updateBookingStatusByTechnician(bookingId: string, payload: UpdateBookingStatusPayload) {
//   return (
//     <button
//       onClick={async () => {
//         try {
//           const data = await updateBookingStatus(bookingId, payload)
//           console.log('Updated:', data)
//         } catch (err) {
//           console.error(err)
//         }
//       }}
//     >
//       Accept Booking
//     </button>
//   )
// }





"use client";

import { toast } from "sonner";

import { updateBookingStatus } from "../_actions/updateBookingStatus";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

interface Props {
  bookingId: string;
  currentStatus: BookingStatus;
}

export default function UpdateBookingStatusByTechnician({
  bookingId,
  currentStatus,
}: Props) {
  const handleStatusChange = async (status: BookingStatus) => {

    // console.log(bookingId, status);
    try {
      await updateBookingStatus(bookingId, { status });

      toast.success("Booking status updated.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update booking status.");
    }
  };

  return (
    <Select
      defaultValue={currentStatus}
      onValueChange={(value) =>
        handleStatusChange(value as BookingStatus)
      }
    >
      <SelectTrigger className="w-[170px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="REQUESTED">
          Requested
        </SelectItem>

        <SelectItem value="ACCEPTED">
          Accepted
        </SelectItem>

        <SelectItem value="DECLINED">
          Declined
        </SelectItem>

        <SelectItem value="PAID">
          Paid
        </SelectItem>

        <SelectItem value="IN_PROGRESS">
          In Progress
        </SelectItem>

        <SelectItem value="COMPLETED">
          Completed
        </SelectItem>

        <SelectItem value="CANCELLED">
          Cancelled
        </SelectItem>
      </SelectContent>
    </Select>
  );
}