'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import Link from 'next/link';
import { ArrowLeft, Loader2, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import { updateTechnicianProfile } from '../../../_actions/updateTechnicianProfile';
import { updateProfile } from '../../../_actions/updateProfile';

const schema = z.object({
  // base profile
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(7, 'Phone is required'),
  profilePhoto: z
    .string()
    .url('Enter a valid URL')
    .optional()
    .or(z.literal('')),
  // technician profile
  bio: z.string().optional(),
  description: z.string().optional(),
  profession: z.string().optional(),
  skills: z.string().optional(),
  yearsOfExperience: z.number().min(0).optional(),
  hourlyRate: z.number().min(0).optional(),
  isAvailable: z.boolean().optional(),
  responseTime: z.number().min(0).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function EditTechnicianProfilePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { isAvailable: true },
  });

  const isAvailable = watch('isAvailable');

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      try {
        // Update base profile (name, phone, profilePhoto)
        const baseRes = await updateProfile({
          name: data.name,
          phone: data.phone,
          profilePhoto: data.profilePhoto || undefined,
        });

        if (!baseRes.success) throw new Error(baseRes.message);

        // Update technician-specific profile
        const techRes = await updateTechnicianProfile({
          bio: data.bio,
          description: data.description,
          profession: data.profession,
          skills: data.skills,
          yearsOfExperience: data.yearsOfExperience,
          hourlyRate: data.hourlyRate,
          isAvailable: data.isAvailable,
          responseTime: data.responseTime,
          address: data.address,
          city: data.city,
          district: data.district,
          profilePhoto: data.profilePhoto || undefined,
        });

        if (!techRes.success) throw new Error(techRes.message);

        toast.success('Profile updated successfully!');
        router.push('/technician-dashboard/profile');
        router.refresh();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : 'Failed to update profile'
        );
      }
    });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-4">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href="/technician-dashboard/profile">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <p className="text-sm text-muted-foreground">
            Update your personal and professional details.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Basic Information</CardTitle>
            <CardDescription>Your account details.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...register('name')} placeholder="John Doe" />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="+8801700000000"
              />
              {errors.phone && (
                <p className="text-xs text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="profilePhoto">Profile Photo URL</Label>
              <Input
                id="profilePhoto"
                {...register('profilePhoto')}
                placeholder="https://example.com/photo.jpg"
              />
              {errors.profilePhoto && (
                <p className="text-xs text-destructive">
                  {errors.profilePhoto.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Professional Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Professional Details</CardTitle>
            <CardDescription>
              Skills, experience and service info.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="profession">Profession</Label>
              <Input
                id="profession"
                {...register('profession')}
                placeholder="e.g. Electrician"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input
                id="skills"
                {...register('skills')}
                placeholder="Wiring, AC Repair, Plumbing"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="yearsOfExperience">Years of Experience</Label>
              <Input
                id="yearsOfExperience"
                type="number"
                min={0}
                {...register('yearsOfExperience', { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="hourlyRate">Hourly Rate (৳)</Label>
              <Input
                id="hourlyRate"
                type="number"
                min={0}
                {...register('hourlyRate', { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="responseTime">Response Time (min)</Label>
              <Input
                id="responseTime"
                type="number"
                min={0}
                {...register('responseTime', { valueAsNumber: true })}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Available for Bookings</p>
                <p className="text-xs text-muted-foreground">
                  Customers can book you
                </p>
              </div>
              <Switch
                checked={!!isAvailable}
                onCheckedChange={(v) => setValue('isAvailable', v)}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={3}
                {...register('bio')}
                placeholder="Tell customers about yourself..."
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                {...register('description')}
                placeholder="Additional details about your services..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Location</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="city">City</Label>
              <Input id="city" {...register('city')} placeholder="Dhaka" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                {...register('district')}
                placeholder="Dhaka"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register('address')}
                placeholder="123 Main St"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button asChild variant="outline" className="flex-1">
            <Link href="/technician-dashboard/profile">Cancel</Link>
          </Button>
          <Button type="submit" className="flex-1" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
