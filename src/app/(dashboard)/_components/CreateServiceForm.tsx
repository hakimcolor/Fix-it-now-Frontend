'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, Plus, CheckCircle2 } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { createService } from '../_actions/createService';
import {
  createServiceSchema,
  CreateServiceFormData,
} from '@/schemas/create-service.schema';
import { ServiceCategory } from '../_actions/getServiceCategories';

interface Props {
  categories: ServiceCategory[];
}

export default function CreateServiceForm({ categories }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategory | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateServiceFormData>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: { title: '', description: '', price: 0, categoryId: '' },
  });

  const pickCategory = (cat: ServiceCategory) => {
    setSelectedCategory(cat);
    setValue('categoryId', cat.id, { shouldValidate: true });
  };

  const onSubmit = (data: CreateServiceFormData) => {
    startTransition(async () => {
      const result = await createService(data);
      if (!result.success) {
        toast.error(result.message || 'Failed to create service');
        return;
      }
      toast.success('Service created successfully!');
      router.push('/technician-dashboard/services');
      router.refresh();
    });
  };

  return (
    <div className="space-y-8">
      {/* Step 1 — pick category */}
      <Card>
        <CardHeader>
          <CardTitle>Step 1 — Select a Category</CardTitle>
          <CardDescription>
            Choose the category your service belongs to.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No categories available.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => {
                const active = selectedCategory?.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => pickCategory(cat)}
                    className={cn(
                      'relative rounded-xl border p-4 text-left transition-all hover:shadow-md focus:outline-none',
                      active
                        ? 'border-primary bg-primary/5 ring-2 ring-primary'
                        : 'border-border bg-card hover:border-primary/50'
                    )}
                  >
                    {active && (
                      <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-primary" />
                    )}
                    <p className="font-semibold">{cat.name}</p>
                    {cat.description && (
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {cat.description}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          )}
          {errors.categoryId && (
            <p className="mt-2 text-xs text-destructive">
              Please select a category.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Step 2 — fill details */}
      <Card>
        <CardHeader>
          <CardTitle>Step 2 — Service Details</CardTitle>
          <CardDescription>
            {selectedCategory ? (
              <>
                Creating under{' '}
                <span className="font-semibold text-primary">
                  {selectedCategory.name}
                </span>
              </>
            ) : (
              'Fill in your service information.'
            )}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Hidden categoryId */}
            <input type="hidden" {...register('categoryId')} />

            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title">Service Title</Label>
              <Input
                id="title"
                placeholder="e.g. Home Electrical Repair"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-xs text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Describe your service in detail..."
                {...register('description')}
              />
              {errors.description && (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <Label htmlFor="price">Price (৳)</Label>
              <Input
                id="price"
                type="number"
                min={1}
                placeholder="1200"
                {...register('price', { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-xs text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isPending || !selectedCategory}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Service
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
