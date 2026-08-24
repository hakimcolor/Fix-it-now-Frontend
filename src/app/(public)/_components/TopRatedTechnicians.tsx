'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Star,
  MapPin,
  Briefcase,
  Wallet,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Technician as ApiTechnician } from '@/app/(dashboard)/_actions/getAllTechnicians';

type Technician = ApiTechnician & {
  name?: string;
  technicianProfile?: {
    id?: string;
    userId?: string;
    profilePhoto?: string;
    profession?: string;
    averageRating?: number;
    totalReviews?: number;
    yearsOfExperience?: number;
    hourlyRate?: number;
    location?: string;
    city?: string;
    isVerified?: boolean;
    isAvailable?: boolean;
    skills?: string[];
    experience?: number;
  };
};

export default function TopRatedTechnicians({
  technicians,
}: {
  technicians: Technician[];
}) {
  if (!technicians.length) return null;

  return (
    <section className="relative overflow-hidden py-24 bg-muted/20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-primary/8 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/8 blur-[140px]" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <Badge
            variant="secondary"
            className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-primary"
          >
            Top Rated Technicians
          </Badge>
          <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Meet Our Trusted Professionals
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Highly skilled and verified experts ready to help with your home
            service needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {technicians.map((tech, index) => {
            // Backend /api/technicians returns flat profile with nested user
            const profile = tech.technicianProfile;
            const name = tech.name ?? tech.user?.name ?? 'Technician';
            const initials =
              name
                .split(' ')
                .map((w: string) => w[0] ?? '')
                .join('')
                .toUpperCase()
                .slice(0, 2) || 'T';

            const photo = profile?.profilePhoto;
            const profession = profile?.profession;
            const rating = profile?.averageRating ?? tech.averageRating ?? 0;
            const reviews = profile?.totalReviews ?? tech.totalReviews ?? 0;
            const experience =
              profile?.yearsOfExperience ?? tech.experience ?? 0;
            const rate = profile?.hourlyRate ?? tech.hourlyRate ?? 0;
            const city = profile?.city ?? tech.location ?? '';
            const isAvailable = profile?.isAvailable ?? false;
            const isVerified = profile?.isVerified ?? tech.isVerified ?? false;

            return (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <Card className="group cursor-pointer overflow-hidden rounded-2xl border bg-background transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                  <CardContent className="flex flex-col items-center p-4 text-center">
                    {isVerified && (
                      <Badge className="mb-3 rounded-full bg-emerald-100 px-3 py-0.5 text-[10px] font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <BadgeCheck className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    )}

                    {/* Avatar — no external placeholder */}
                    <div className="relative mb-3">
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl transition-all duration-300 group-hover:scale-125 group-hover:opacity-80" />
                      <Avatar className="relative h-20 w-20 ring-2 ring-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:ring-primary/40">
                        <AvatarImage src={photo || undefined} alt={name} />
                        <AvatarFallback className="bg-primary/10 text-lg font-bold text-primary">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      {isAvailable && (
                        <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500" />
                      )}
                    </div>

                    <h3 className="line-clamp-1 text-sm font-semibold">
                      {name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {profession ?? 'Technician'}
                    </p>

                    {city && (
                      <p className="mt-1 flex items-center gap-0.5 text-[10px] text-muted-foreground">
                        <MapPin className="h-2.5 w-2.5" />
                        {city}
                      </p>
                    )}

                    <div className="mt-2 flex items-center gap-1 rounded-full bg-muted px-2.5 py-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold">
                        {rating.toFixed(1)}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        ({reviews})
                      </span>
                    </div>

                    <div className="mt-2 grid w-full grid-cols-2 gap-1">
                      <div className="rounded-lg bg-muted/60 p-1.5 text-center">
                        <Briefcase className="mx-auto h-3 w-3 text-primary" />
                        <p className="mt-0.5 text-[10px] font-medium">
                          {experience}yr
                        </p>
                      </div>
                      <div className="rounded-lg bg-muted/60 p-1.5 text-center">
                        <Wallet className="mx-auto h-3 w-3 text-primary" />
                        <p className="mt-0.5 text-[10px] font-medium">
                          ৳{rate}
                        </p>
                      </div>
                    </div>

                    <Button
                      asChild
                      size="sm"
                      className="mt-3 w-full rounded-xl text-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/20"
                    >
                      <Link href={`/find-technicians/${tech.id}`}>
                        View Profile
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-xl border-2 px-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5"
          >
            <Link href="/find-technicians">
              Browse All Technicians
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
