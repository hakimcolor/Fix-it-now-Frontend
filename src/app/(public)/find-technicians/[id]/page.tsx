import Link from 'next/link';
import {
  ArrowLeft,
  BadgeCheck,
  Briefcase,
  Calendar,
  Clock,
  Mail,
  MapPin,
  Star,
  Wallet,
  Wrench,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getTechnicianById } from '../../_actions/getTechnicianById';

interface TechnicianDetailsPageProps {
  params: Promise<{ id: string }>;
}

const DAY_ORDER = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export default async function TechnicianDetailsPage({
  params,
}: TechnicianDetailsPageProps) {
  const { id } = await params;
  const result = await getTechnicianById(id);

  // Flat shape: result.data is the technician object directly
  const tech = result?.data;

  if (!tech) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <Wrench className="h-12 w-12 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Technician Not Found</h1>
        <Link
          href="/find-technicians"
          className="text-sm text-primary hover:underline"
        >
          ← Back to technicians
        </Link>
      </div>
    );
  }

  const initials = tech.user?.name
    ? tech.user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'T';

  const isActive = tech.user?.status === 'ACTIVE';

  const availability: Record<string, string[]> = tech.availability ?? {};
  const sortedDays = DAY_ORDER.filter((d) => d in availability);

  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <div className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <Link
            href="/find-technicians"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Technicians
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* ── LEFT SIDEBAR ── */}
          <div className="space-y-5">
            {/* Profile card */}
            <Card className="overflow-hidden">
              <div className="h-24 bg-linear-to-r from-primary via-secondary to-accent" />
              <CardContent className="px-6 pb-6">
                {/* Avatar */}
                <div className="relative -mt-12 mb-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-background bg-linear-to-br from-primary/20 to-secondary/20 text-3xl font-bold text-primary shadow-lg">
                    {initials}
                  </div>
                  {isActive && (
                    <span className="absolute bottom-0 left-16 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-green-500">
                      <span className="h-2 w-2 rounded-full bg-white" />
                    </span>
                  )}
                </div>

                {/* Name */}
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">
                    {tech.user?.name ?? 'Technician'}
                  </h1>
                  {tech.isVerified && (
                    <BadgeCheck className="h-5 w-5 shrink-0 text-blue-500" />
                  )}
                </div>

                {/* Status badges */}
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge
                    variant={isActive ? 'default' : 'secondary'}
                    className="rounded-full"
                  >
                    {tech.user?.status ?? 'Unknown'}
                  </Badge>
                  {tech.isVerified && (
                    <Badge className="rounded-full bg-blue-500 hover:bg-blue-500">
                      Verified
                    </Badge>
                  )}
                </div>

                <Separator className="my-4" />

                {/* Contact info */}
                <div className="space-y-3">
                  {tech.user?.email && (
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 shrink-0 text-primary" />
                      <span className="truncate text-muted-foreground">
                        {tech.user.email}
                      </span>
                    </div>
                  )}
                  {tech.location && (
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">
                        {tech.location}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">
                      Joined {new Date(tech.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rate card */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Hourly Rate
                    </p>
                    <p className="mt-1 text-3xl font-bold text-primary">
                      {tech.hourlyRate > 0
                        ? `৳${tech.hourlyRate}`
                        : 'Negotiable'}
                    </p>
                    <p className="text-xs text-muted-foreground">per hour</p>
                  </div>
                  <div className="rounded-2xl bg-primary/10 p-3">
                    <Wallet className="h-7 w-7 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card>
                <CardContent className="flex flex-col items-center p-4">
                  <Star className="mb-1.5 h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <p className="text-xl font-bold">
                    {tech.averageRating > 0
                      ? tech.averageRating.toFixed(1)
                      : '—'}
                  </p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-4">
                  <Briefcase className="mb-1.5 h-5 w-5 text-primary" />
                  <p className="text-xl font-bold">{tech.experience}</p>
                  <p className="text-xs text-muted-foreground">Yrs Exp</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* ── RIGHT CONTENT ── */}
          <div className="space-y-6 lg:col-span-2">
            {/* Bio */}
            {tech.bio && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-3 text-lg font-semibold">About</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    {tech.bio}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Skills */}
            {tech.skills && tech.skills.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-lg font-semibold">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {tech.skills.map((skill: string) => (
                      <div
                        key={skill}
                        className="flex items-center gap-1.5 rounded-xl border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary"
                      >
                        <Wrench className="h-3.5 w-3.5" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Availability */}
            {sortedDays.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Availability</h2>
                  </div>
                  <div className="space-y-3">
                    {sortedDays.map((day) => {
                      const slots: string[] = availability[day];
                      const hasSlots = slots.length > 0;
                      return (
                        <div
                          key={day}
                          className="flex items-start justify-between gap-4 rounded-xl border p-3"
                        >
                          <span className="w-24 shrink-0 text-sm font-medium capitalize">
                            {day}
                          </span>
                          {hasSlots ? (
                            <div className="flex flex-wrap gap-2">
                              {slots.map((slot) => (
                                <span
                                  key={slot}
                                  className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                                >
                                  {slot}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              Not available
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews placeholder */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Reviews</h2>
                  <Badge variant="secondary" className="rounded-full">
                    {tech.totalReviews} total
                  </Badge>
                </div>
                {tech.totalReviews === 0 ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <Star className="mb-2 h-8 w-8 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground">
                      No reviews yet
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Be the first to leave a review
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <p className="text-4xl font-bold">
                      {tech.averageRating.toFixed(1)}
                    </p>
                    <div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`h-4 w-4 ${
                              s <= Math.round(tech.averageRating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground/30'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {tech.totalReviews} reviews
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
