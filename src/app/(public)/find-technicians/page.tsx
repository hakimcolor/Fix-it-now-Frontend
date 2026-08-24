import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Clock,
  MapPin,
  Star,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  getAllTechnicians,
  Technician,
} from '@/app/(dashboard)/_actions/getAllTechnicians';

interface FindTechniciansPageProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

function TechnicianCard({ tech }: { tech: Technician }) {
  const initials = tech.user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const isActive = tech.user.status === 'ACTIVE';

  // Count available days from availability object
  const availableDays = Object.entries(tech.availability ?? {}).filter(
    ([, slots]) => Array.isArray(slots) && slots.length > 0
  ).length;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
      {/* Colorful top accent */}
      <div className="h-1.5 w-full bg-linear-to-r from-primary via-secondary to-accent" />

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Avatar row */}
        <div className="flex items-start justify-between">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 via-primary/10 to-secondary/20 text-xl font-bold text-primary shadow-sm">
              {initials}
            </div>
            {isActive && (
              <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-green-500">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            )}
          </div>

          {tech.isVerified && (
            <div className="flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-600">
              <BadgeCheck className="h-3.5 w-3.5" />
              Verified
            </div>
          )}
        </div>

        {/* Name + location */}
        <div className="mt-3">
          <h2 className="line-clamp-1 text-base font-semibold tracking-tight">
            {tech.user.name}
          </h2>
          <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">
              {tech.location || 'Location not set'}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg bg-yellow-50 px-2.5 py-1 dark:bg-yellow-950/30">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
              {tech.averageRating > 0 ? tech.averageRating.toFixed(1) : 'New'}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {tech.totalReviews} {tech.totalReviews === 1 ? 'review' : 'reviews'}
          </span>
        </div>

        {/* Stats row */}
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          <div className="flex flex-col items-center rounded-xl bg-muted/60 px-1 py-2.5">
            <Briefcase className="mb-1 h-3.5 w-3.5 text-primary" />
            <span className="text-sm font-bold">{tech.experience}</span>
            <span className="text-[10px] text-muted-foreground">Yrs Exp</span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-muted/60 px-1 py-2.5">
            <Wallet className="mb-1 h-3.5 w-3.5 text-primary" />
            <span className="text-sm font-bold">
              {tech.hourlyRate > 0 ? `৳${tech.hourlyRate}` : 'Free'}
            </span>
            <span className="text-[10px] text-muted-foreground">Per Hr</span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-muted/60 px-1 py-2.5">
            <Clock className="mb-1 h-3.5 w-3.5 text-primary" />
            <span className="text-sm font-bold">{availableDays}</span>
            <span className="text-[10px] text-muted-foreground">Days</span>
          </div>
        </div>

        {/* Skills */}
        {tech.skills && tech.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tech.skills.slice(0, 2).map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="rounded-full px-2.5 py-0.5 text-[11px]"
              >
                {skill}
              </Badge>
            ))}
            {tech.skills.length > 2 && (
              <Badge
                variant="outline"
                className="rounded-full px-2.5 py-0.5 text-[11px]"
              >
                +{tech.skills.length - 2} more
              </Badge>
            )}
          </div>
        )}

        {/* Spacer to push button down */}
        <div className="flex-1" />

        {/* CTA */}
        <Link
          href={`/find-technicians/${tech.id}`}
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:gap-3"
        >
          View Profile
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

export default async function FindTechniciansPage({
  searchParams,
}: FindTechniciansPageProps) {
  const params = await searchParams;

  const result = await getAllTechnicians({
    page: Number(params.page) || 1,
    limit: Number(params.limit) || 12,
  });

  const technicians = result.data ?? [];
  const meta = result.meta;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden bg-linear-to-br from-primary/10 via-secondary/5 to-accent/10 py-16">
        <div className="container relative mx-auto px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap className="h-4 w-4" />
            Trusted Professionals
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Find Your{' '}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Technician
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Browse verified professionals, compare experience &amp; rates, and
            hire the right expert for your needs.
          </p>

          <div className="mx-auto mt-8 flex max-w-sm items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {meta?.total ?? technicians.length}
              </p>
              <p className="text-xs text-muted-foreground">Technicians</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">4.8★</p>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">24/7</p>
              <p className="text-xs text-muted-foreground">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>
            Showing{' '}
            <strong className="text-foreground">{technicians.length}</strong> of{' '}
            <strong className="text-foreground">
              {meta?.total ?? technicians.length}
            </strong>{' '}
            technicians
          </span>
        </div>

        {technicians.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {technicians.map((tech: Technician) => (
              <TechnicianCard key={tech.id} tech={tech} />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed py-20">
            <div className="mb-4 rounded-full bg-muted p-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">No Technicians Found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Check back soon — more professionals are joining every day.
            </p>
          </div>
        )}

        {meta && meta.totalPage > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map(
              (p) => (
                <Link
                  key={p}
                  href={`/find-technicians?page=${p}&limit=${meta.limit}`}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                    p === meta.page
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background hover:bg-muted'
                  }`}
                >
                  {p}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
