import { redirect } from 'next/navigation';

// Slot creation is handled directly on the slots page via AddBookingSlotForm.
// This route redirects there so any bookmarked or linked /slots/create URL still works.
type Props = { params: Promise<{ serviceId: string }> };

export default async function AddBookingSlotRedirectPage({ params }: Props) {
  const { serviceId } = await params;
  redirect(`/technician-dashboard/services/${serviceId}/slots`);
}
