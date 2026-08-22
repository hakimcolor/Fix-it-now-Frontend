import { z } from "zod";

export const reviewSchema = z.object({
  customerId: z.string().uuid(),
  technicianId: z.string().uuid(),
  bookingId: z.string().uuid(),
  serviceId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters.")
    .max(500),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;