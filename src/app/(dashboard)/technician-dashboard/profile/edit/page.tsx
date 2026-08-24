'use client';

import { useTransition } from 'react';
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import { updateTechnicianProfile } from '../../../_actions/updateTechnicianProfile';

// Matches exact backend payload:
// { bio, skills: string[], experience, hourlyRate, location }
const schema = z.object({
  bio: z.string().optional(),
  skills: z.string().optional(), // comma-separated, converted to array on submit
  experience: z.number().min(0).optional(),
  hourlyRate: z.number().min(0).optional(),
  location: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function EditTechnicianProfilePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      bio: '',
      skills: '',
      experience: 0,
      hourlyRate: 0,
      location: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      // Convert comma-separated skills string → string[]
      const skillsArray = data.skills
        ? data.skills
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

      const result = await updateTechnicianProfile({
        bio: data.bio,
        skills: skillsArray,
        experience: data.experience,
        hourlyRate: data.hourlyRate,
        location: data.location,
      });

      if (!result.success) {
        toast.error(result.message || 'Failed to update profile');
        return;
      }

      toast.success('Profile updated successfully!');
      router.push('/technician-dashboard/profile');
      router.refresh();
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-4">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href="/technician-dashboard/profile">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <p className="text-sm text-muted-foreground">
            Update your professional details.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Professional Details</CardTitle>
            <CardDescription>
              These details appear on your public profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Bio */}
            <div className="space-y-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={3}
                placeholder="e.g. 5+ years experienced electrician"
                {...register('bio')}
              />
            </div>

            {/* Skills */}
            <div className="space-y-1.5">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="Electrical Wiring, Panel Installation, Troubleshooting"
                {...register('skills')}
              />
              <p className="text-xs text-muted-foreground">
                Comma-separated list of skills
              </p>
            </div>

            {/* Experience */}
            <div className="space-y-1.5">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min={0}
                placeholder="5"
                {...register('experience', { valueAsNumber: true })}
              />
              {errors.experience && (
                <p className="text-xs text-destructive">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Hourly Rate */}
            <div className="space-y-1.5">
              <Label htmlFor="hourlyRate">Hourly Rate (৳)</Label>
              <Input
                id="hourlyRate"
                type="number"
                min={0}
                placeholder="50"
                {...register('hourlyRate', { valueAsNumber: true })}
              />
              {errors.hourlyRate && (
                <p className="text-xs text-destructive">
                  {errors.hourlyRate.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g. Dhaka"
                {...register('location')}
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
