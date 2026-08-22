// import { getBookingById } from '@/app/(dashboard)/_actions/getBookingById';
// import React from 'react'

// // {
// //   "customerId": "93e4af2d-bd6f-46cc-b304-ee0de7cf7e94", done 
// //   "technicianId": "b2365bc4-5a38-458a-b87b-505e570ceba4", done 
// //   "bookingId": "0b207247-4f46-4bb6-be3c-945fecef3479", done 
// //   "serviceId": "086452e4-95d2-4624-8b7e-7c92ec91a555",
// //   "rating": 5,
// //   "comment": "Excellent service. The technician was professional, punctual, and completed the job perfectly."
// // }

// export default async function LeaveReview({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {

//   const { id } = await params;
//   const result = await getBookingById(id);

//     const booking = result?.data;

//   if (!booking) {
//     return (
//       <div className="flex h-[60vh] items-center justify-center">
//         <p>Booking not found.</p>
//       </div>
//     );
//   }

//   const payload = {
//   customerId: booking.customerId,
//   technicianId: booking.technicianId,
//   bookingId: booking.id,
//   serviceId: booking.serviceId,
//       // rating: userinput | 0,
//     // comment: userinput | "",
// };


//   console.log(result, "from Leave Review Page");




//   return (
//     <div>Leave Review {id}</div>
//   )
// }









import { getBookingById } from "@/app/(dashboard)/_actions/getBookingById";
import LeaveReviewForm from "@/app/(dashboard)/_components/LeaveReviewForm";
import { notFound } from "next/navigation";


export default async function LeaveReview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getBookingById(id);

  const booking = result?.data;

  if (!booking) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl py-10">
      <LeaveReviewForm
        customerId={booking.customerId}
        technicianId={booking.technicianId}
        bookingId={booking.id}
        serviceId={booking.serviceId}
      />
    </div>
  );
}