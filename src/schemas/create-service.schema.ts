
import { z } from "zod";

export const createServiceSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),

  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  price: z
    .number()
    .min(1, "Price must be greater than 0"),

  priceType: z.enum(["HOURLY", "FIXED"]),

  estimatedDuration: z
    .number()
    .min(1, "Duration is required"),

  thumbnail: z
    .string()
    .url("Enter a valid image URL"),

  isAvailable: z.boolean(),
});

export type CreateServiceFormData = z.infer<
  typeof createServiceSchema
>;
