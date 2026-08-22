import { z } from "zod";

export const updateServiceSchema = z.object({
  categoryId: z.string().optional(),
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.number().optional(),
  priceType: z.enum(["FIXED", "HOURLY"]).optional(),
  estimatedDuration: z.number().optional(),
  thumbnail: z.string().url().optional(),
  isAvailable: z.boolean().optional(),
});

export type UpdateServiceFormData = z.infer<
  typeof updateServiceSchema
>;