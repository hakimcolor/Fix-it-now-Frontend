'use client';

import { useEffect, useState, useCallback } from 'react';
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
  Clock,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 0,
    eyebrow: 'Home Services Platform',
    title: 'Expert Repairs,',
    titleAccent: 'At Your Doorstep.',
    description:
      'Connect with verified professionals for AC, plumbing, electrical, cleaning and more — booked in minutes.',
    primaryButton: 'Explore Services',
    primaryHref: '/services',
    secondaryButton: 'Find Technicians',
    secondaryHref: '/find-technicians',
    icon: Search,
    image:
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1400&auto=format&fit=crop',
    badge: 'Verified Professional',
    badgeIcon: CheckCircle2,
    color: '#3b82f6',
    colorEnd: '#8b5cf6',
    accentClass: 'from-blue-500 to-violet-500',
  },
  {
    id: 1,
    eyebrow: 'Instant Booking',
    title: 'Schedule Fast,',
    titleAccent: 'Get It Done.',
    description:
      'Choose a technician, pick a time slot, confirm — your home service is booked in under 60 seconds.',
    primaryButton: 'Book Now',
    primaryHref: '/find-technicians',
    secondaryButton: 'How It Works',
    secondaryHref: '/how-it-works',
    icon: CalendarCheck,
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1400&auto=format&fit=crop',
    badge: 'Available Today',
    badgeIcon: Zap,
    color: '#14b8a6',
    colorEnd: '#10b981',
    accentClass: 'from-teal-400 to-emerald-500',
  },
  {
    id: 2,
    eyebrow: 'Trusted Professionals',
    title: 'Background Checked,',
    titleAccent: 'Top Rated.',
    description:
      'Every technician is verified, reviewed, and rated. You see the full profile before you commit.',
    primaryButton: 'Browse Technicians',
    primaryHref: '/find-technicians',
    secondaryButton: 'Our Services',
    secondaryHref: '/services',
    icon: ShieldCheck,
    image:
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1400&auto=format&fit=crop',
    badge: 'Background Checked',
    badgeIcon: ShieldCheck,
    color: '#8b5cf6',
    colorEnd: '#ec4899',
    accentClass: 'from-violet-500 to-pink-500',
  },
  {
    id: 3,
    eyebrow: 'Grow Your Business',
    title: 'More Clients,',
    titleAccent: 'More Revenue.',
    description:
      'Join hundreds of technicians growing their business on FixItNow — manage bookings and get paid faster.',
    primaryButton: 'Join as Technician',
    primaryHref: '/register',
    secondaryButton: 'Learn More',
    secondaryHref: '/how-it-works',
    icon: Wrench,
    image:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1400&auto=format&fit=crop',
    badge: 'New Opportunities',
    badgeIcon: TrendingUp,
    color: '#f97316',
    colorEnd: '#eab308',
    accentClass: 'from-orange-500 to-yellow-400',
  },
];

const stats = [
  { value: '10K+', label: 'Happy Clients' },
  { value: '500+', label: 'Verified Pros' },
  { value: '4.9', label: 'Avg Rating' },
  { value: '98%', label: 'Satisfaction' },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    []
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    []
  );

  useEffect(() => {
    if (isHovering) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [isHovering, next]);

  const slide = slides[current];
  const BadgeIcon = slide.badgeIcon;

  return (
    <section
      className="relative w-full overflow-hidden bg-[#06080f]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Ambient orb A */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`orb1-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          className="pointer-events-none absolute"
          style={{
            top: '-20%',
            left: '-15%',
            width: '70vw',
            height: '70vw',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${slide.color}1f 0%, transparent 65%)`,
            filter: 'blur(80px)',
          }}
        />
      </AnimatePresence>

      {/* Ambient orb B */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`orb2-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          className="pointer-events-none absolute"
          style={{
            bottom: '-15%',
            right: '-10%',
            width: '55vw',
            height: '55vw',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${slide.colorEnd}18 0%, transparent 65%)`,
            filter: 'blur(100px)',
          }}
        />
      </AnimatePresence>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 90% 90% at 50% 40%, black 20%, transparent 100%)',
        }}
      />

      {/* Top accent line */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`line-${current}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute top-0 left-0 h-0.5 w-full origin-left"
          style={{
            background: `linear-gradient(to right, ${slide.color}, ${slide.colorEnd}, transparent)`,
          }}
        />
      </AnimatePresence>

      {/* Main content grid */}
      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center px-6 lg:grid-cols-2 lg:px-10">
        {/* LEFT — Text */}
        <div className="flex flex-col justify-center py-24 lg:py-0 lg:pr-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              {/* Eyebrow */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-white/50">
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: slide.color }}
                />
                {slide.eyebrow}
              </div>

              {/* Headline */}
              <h1 className="text-5xl font-black leading-[1.04] tracking-tight text-white sm:text-6xl xl:text-7xl">
                {slide.title}
                <br />
                <span
                  className={`bg-linear-to-r ${slide.accentClass} bg-clip-text text-transparent`}
                >
                  {slide.titleAccent}
                </span>
              </h1>

              <p className="mt-5 max-w-md text-base leading-7 text-white/40 sm:text-lg">
                {slide.description}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className={`group h-12 gap-2 rounded-xl bg-linear-to-r ${slide.accentClass} border-0 px-7 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl`}
                >
                  <Link href={slide.primaryHref}>
                    {slide.primaryButton}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl border border-white/10 bg-white/4 px-7 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/8 hover:text-white"
                >
                  <Link href={slide.secondaryHref}>
                    {slide.secondaryButton}
                  </Link>
                </Button>
              </div>

              {/* Mobile slide controls */}
              <div className="mt-10 flex items-center gap-3 lg:hidden">
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex gap-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`rounded-full transition-all duration-300 ${i === current ? `h-2 w-6 bg-linear-to-r ${slide.accentClass}` : 'h-2 w-2 bg-white/20'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT — Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`img-${current}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative hidden lg:flex lg:items-center lg:justify-center lg:py-16"
          >
            {/* Glow */}
            <div
              className="absolute inset-8 rounded-[2rem] opacity-25 blur-3xl"
              style={{
                background: `linear-gradient(135deg, ${slide.color}, ${slide.colorEnd})`,
              }}
            />

            {/* Image card */}
            <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/8 shadow-2xl">
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width:1200px) 50vw, 580px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-transparent" />

                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
                        FixItNow
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-white">
                        Professional Home Services
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-sm font-black text-gray-900">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      4.9
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge — top left */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -left-6 top-24 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 shadow-xl backdrop-blur-xl"
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${slide.color}, ${slide.colorEnd})`,
                }}
              >
                <BadgeIcon className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-white/35">Status</p>
                <p className="text-xs font-bold text-white">{slide.badge}</p>
              </div>
            </motion.div>

            {/* Floating reviews — bottom right */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.42 }}
              className="absolute -right-6 bottom-24 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 shadow-xl backdrop-blur-xl"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="h-3 w-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mt-0.5 text-xs font-bold text-white">
                  500+ Reviews
                </p>
              </div>
            </motion.div>

            {/* Desktop vertical slide controls */}
            <div className="absolute right-0 top-1/2 flex -translate-y-1/2 translate-x-3 flex-col items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 backdrop-blur transition-all hover:bg-white/10 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex flex-col gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${i === current ? 'h-6 w-2' : 'h-2 w-2 bg-white/20 hover:bg-white/40'}`}
                    style={
                      i === current
                        ? {
                            background: `linear-gradient(to bottom, ${slide.color}, ${slide.colorEnd})`,
                          }
                        : {}
                    }
                  />
                ))}
              </div>
              <button
                onClick={next}
                aria-label="Next"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 backdrop-blur transition-all hover:bg-white/10 hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stats bar */}
      <div className="relative border-t border-white/6 bg-white/2 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-0.5 text-center sm:items-start sm:text-left"
              >
                <span
                  className={`text-2xl font-black bg-linear-to-r ${slide.accentClass} bg-clip-text text-transparent`}
                >
                  {value}
                </span>
                <span className="text-xs text-white/35">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-18 left-6 hidden items-center gap-2 lg:flex lg:left-10">
        <Clock className="h-3.5 w-3.5 text-white/20" />
        <span className="text-xs tabular-nums text-white/20">
          {String(current + 1).padStart(2, '0')} /{' '}
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
