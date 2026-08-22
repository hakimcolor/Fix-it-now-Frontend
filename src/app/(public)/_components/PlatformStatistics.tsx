'use client';

import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { BriefcaseBusiness, Users, Star, Wrench } from 'lucide-react';

interface Props {
  totalServices: number;
  totalTechnicians: number;
  totalCategories: number;
}

export default function PlatformStatistics({
  totalServices,
  totalTechnicians,
  totalCategories,
}: Props) {
  const stats = [
    {
      title: 'Active Services',
      value: totalServices,
      suffix: '+',
      icon: BriefcaseBusiness,
    },
    {
      title: 'Verified Technicians',
      value: totalTechnicians,
      suffix: '+',
      icon: Users,
    },
    { title: 'Average Rating', value: 4.9, suffix: '★', icon: Star },
    {
      title: 'Service Categories',
      value: totalCategories,
      suffix: '+',
      icon: Wrench,
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 bg-linear-to-br from-primary via-primary/95 to-blue-700">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <Badge className="border-white/20 bg-white/15 px-4 py-1.5 text-white hover:bg-white/20">
            Platform Statistics
          </Badge>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Trusted by Thousands of Customers
          </h2>
          <p className="mt-4 text-lg text-white/75">
            Our growing community relies on FixItNow for fast, secure, and
            professional home services.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="group cursor-default rounded-3xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/30 hover:bg-white/15 hover:shadow-2xl">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/25">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-5xl font-extrabold tracking-tight text-white">
                    <CountUp
                      end={item.value}
                      duration={2}
                      decimals={item.value % 1 !== 0 ? 1 : 0}
                    />
                    {item.suffix}
                  </h3>
                  <p className="mt-3 text-base font-medium text-white/75">
                    {item.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
