'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Search,
  ShieldCheck,
  Star,
  Users,
  Wrench,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const slides = [
  {
    id: 0,
    badge: 'Trusted Home Services',
    title: 'Expert Help,',
    titleAccent: 'Right When You Need It.',
    description:
      'Find trusted professionals for AC repair, plumbing, electrical work, cleaning, painting, and more — all in one place.',
    primaryButton: 'Find a Service',
    primaryHref: '/services',
    secondaryButton: 'Find Technicians',
    secondaryHref: '/find-technicians',
    icon: Search,
    image:
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200&auto=format&fit=crop',
    rating: '4.9',
    reviews: '120+ Reviews',
    floatingText: 'Verified Professional',
    accent: 'from-blue-600 to-primary',
  },
  {
    id: 1,
    badge: 'Easy Booking',
    title: 'Choose. Schedule.',
    titleAccent: 'Done.',
    description:
      'Pick your service, choose a qualified technician, select an available time slot, and book in just a few clicks.',
    primaryButton: 'Book a Technician',
    primaryHref: '/find-technicians',
    secondaryButton: 'How It Works',
    secondaryHref: '/how-it-works',
    icon: CalendarCheck,
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop',
    rating: '4.8',
    reviews: 'Easy Scheduling',
    floatingText: 'Available Today',
    accent: 'from-teal-500 to-emerald-400',
  },
  {
    id: 2,
    badge: 'Verified Professionals',
    title: 'Skilled Professionals',
    titleAccent: 'You Can Trust.',
    description:
      'Compare profiles, ratings, experience, and availability before making your choice.',
    primaryButton: 'Find Technicians',
    primaryHref: '/find-technicians',
    secondaryButton: 'Explore Services',
    secondaryHref: '/services',
    icon: ShieldCheck,
    image:
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1200&auto=format&fit=crop',
    rating: '4.9',
    reviews: 'Top Rated',
    floatingText: 'Verified Technician',
    accent: 'from-violet-500 to-purple-400',
  },
  {
    id: 3,
    badge: 'For Technicians',
    title: 'Turn Your Skills Into',
    titleAccent: 'More Jobs.',
    description:
      'Create your professional profile, manage your availability, receive bookings, and grow your business.',
    primaryButton: 'Join as Technician',
    primaryHref: '/register',
    secondaryButton: 'Learn More',
    secondaryHref: '/how-it-works',
    icon: Wrench,
    image:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
    rating: 'Grow',
    reviews: 'Your Business',
    floatingText: 'More Opportunities',
    accent: 'from-orange-500 to-amber-400',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  useEffect(() => {
    if (isHovering) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [isHovering, current]);

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <section
      className="relative min-h-[92vh] w-full overflow-hidden bg-background"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.2)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.2)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      {/* Animated bg glow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`pointer-events-none absolute -left-40 -top-40 h-150 w-150 rounded-full bg-linear-to-br ${slide.accent} opacity-10 blur-[140px]`}
        />
      </AnimatePresence>

      <div className="container relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${current}`}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
            >
              {/* Badge */}
              <Badge
                variant="outline"
                className={`mb-6 gap-1.5 rounded-full border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary`}
              >
                <Icon className="h-3.5 w-3.5" />
                {slide.badge}
              </Badge>

              {/* Heading */}
              <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                {slide.title}{' '}
                <span
                  className={`bg-linear-to-r ${slide.accent} bg-clip-text text-transparent`}
                >
                  {slide.titleAccent}
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg md:text-xl md:leading-8">
                {slide.description}
              </p>

              {/* Buttons */}
              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="group h-13 w-full rounded-xl px-8 text-base font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 sm:w-auto"
                >
                  <Link href={slide.primaryHref}>
                    {slide.primaryButton}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-13 w-full rounded-xl border-2 px-8 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/5 sm:w-auto"
                >
                  <Link href={slide.secondaryHref}>
                    {slide.secondaryButton}
                  </Link>
                </Button>
              </div>

              {/* Trust bar */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <span className="text-sm font-medium">Verified Pros</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500/10">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <span className="text-sm font-medium">4.9 Avg Rating</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Secure Payments</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT — Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${current}`}
              initial={{ opacity: 0, scale: 0.94, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.96, x: -40 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="order-1 relative flex items-center justify-center lg:order-2"
            >
              {/* Image frame */}
              <div className="relative aspect-4/3 w-full max-w-xl overflow-hidden rounded-3xl border border-border/50 shadow-2xl shadow-black/20">
                <Image
                  src={slide.image || '/placeholder-service.png'}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,600px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                {/* Bottom overlay */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-sm text-white/70">FixItNow</p>
                      <p className="mt-0.5 text-lg font-semibold text-white">
                        Professional Home Services
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-white/95 px-3 py-1.5 text-sm font-bold text-gray-900 shadow-lg">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {slide.rating}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating verified card */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -left-4 top-6 flex items-center gap-3 rounded-2xl border border-border/80 bg-card p-3 shadow-xl sm:-left-6 sm:p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Trusted</p>
                  <p className="text-sm font-semibold">{slide.floatingText}</p>
                </div>
              </motion.div>

              {/* Floating reviews card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -right-4 flex items-center gap-3 rounded-2xl border border-border/80 bg-card px-4 py-3 shadow-xl sm:-right-6"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{slide.reviews}</p>
                  <div className="mt-0.5 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="h-3 w-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Nav Controls */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4">
        <button
          onClick={prev}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 shadow-md backdrop-blur transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`cursor-pointer rounded-full transition-all duration-300 ${
                i === current
                  ? 'h-2.5 w-8 bg-primary'
                  : 'h-2.5 w-2.5 bg-border hover:bg-primary/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 shadow-md backdrop-blur transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
