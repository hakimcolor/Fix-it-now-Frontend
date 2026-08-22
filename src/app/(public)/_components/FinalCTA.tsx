'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Search,
  Wrench,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary via-blue-700 to-teal-600" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <Badge className="border-white/20 bg-white/15 px-4 py-1.5 text-white hover:bg-white/25">
            <Sparkles className="mr-2 h-4 w-4" />
            Join the FixItNow Community
          </Badge>

          <h2 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
            Home Services Made
            <br />
            <span className="text-white/85">Simple & Reliable</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Whether you need a trusted technician or you're a skilled
            professional looking for more clients, FixItNow connects the right
            people at the right time.
          </p>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white">
            {[
              { value: '15K+', label: 'Completed Jobs' },
              { value: '850+', label: 'Verified Technicians' },
              { value: '4.9★', label: 'Customer Rating' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl font-extrabold">{stat.value}</h3>
                <p className="mt-1 text-sm text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group h-14 rounded-xl bg-white px-8 text-base font-semibold text-primary shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-2xl"
            >
              <Link href="/services">
                <Search className="mr-2 h-5 w-5" />
                Find a Service
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-xl border-2 border-white/60 bg-transparent px-8 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
            >
              <Link href="/register">
                <Wrench className="mr-2 h-5 w-5" />
                Become a Technician
              </Link>
            </Button>
          </div>

          {/* Trust pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {[
              'Verified Professionals',
              'Secure Payments',
              'Trusted by Thousands',
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
