'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Hammer,
  Home,
  Paintbrush,
  Sofa,
  Fan,
  Droplet,
  Wrench,
  Zap,
  Sparkles,
  Scissors,
  Truck,
  Shield,
} from 'lucide-react';

// Fallback icon map by category name keywords
const iconMap: Record<string, React.ElementType> = {
  plumb: Droplet,
  electr: Zap,
  paint: Paintbrush,
  clean: Sparkles,
  ac: Fan,
  air: Fan,
  carpet: Sofa,
  floor: Hammer,
  roof: Home,
  handyman: Wrench,
  carpent: Scissors,
  moving: Truck,
  secur: Shield,
};

function getCategoryIcon(name: string): React.ElementType {
  const lower = name.toLowerCase();
  for (const [key, Icon] of Object.entries(iconMap)) {
    if (lower.includes(key)) return Icon;
  }
  return Wrench;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

export default function PopularIndustries({
  categories,
}: {
  categories: Category[];
}) {
  const active = categories.filter((c) => c.isActive).slice(0, 8);

  if (!active.length) return null;

  return (
    <section className="relative py-16 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[3px] text-muted-foreground">
          Popular Service Categories
        </p>

        <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
          {active.map((item, i) => {
            const Icon = getCategoryIcon(item.name);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <Link
                  href={`/services?categoryId=${item.id}`}
                  className="group flex cursor-pointer flex-col items-center gap-3 rounded-2xl p-3 transition-all duration-300 hover:bg-background hover:shadow-lg"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:shadow-md">
                    <Icon className="h-8 w-8 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                  </div>
                  <span className="text-center text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                    {item.name}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
