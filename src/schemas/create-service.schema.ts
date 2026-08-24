import { z } from 'zod';

// Matches exact backend payload: { title, description, price, categoryId }
export const createServiceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(1, 'Price must be greater than 0'),
  categoryId: z.string().min(1, 'Category is required'),
});

export type CreateServiceFormData = z.infer<typeof createServiceSchema>;
