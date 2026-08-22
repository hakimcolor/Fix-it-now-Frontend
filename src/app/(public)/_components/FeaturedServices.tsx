'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Tag, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  priceType: string;
  thumbnail: string;
  averageRating: number;
  totalReviews: number;
  estimatedDuration: number;
  isAvailable: boolean;
  category: { name: string };
}

export default function FeaturedServices({
  services,
}: {
  services: Service[];
}) {
  if (!services.length) return null;

  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-primary/8 blur-[120px]" />
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
            Featured Services
          </Badge>
          <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Professional Home Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Book trusted professionals for every home repair, maintenance, and
            cleaning task.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <Card className="group h-full cursor-pointer overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15">
                {/* Image */}
                <div className="relative h-60 overflow-hidden bg-muted">
                  {service.thumbnail ? (
                    <Image
                      src={service.thumbnail}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-primary/10">
                      <Tag className="h-16 w-16 text-primary/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Rating */}
                  <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold shadow-md">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    {service.averageRating?.toFixed(1) ?? '0.0'}
                  </div>

                  {/* Category */}
                  <div className="absolute right-4 top-4 rounded-xl bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg">
                    {service.category?.name}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <CardContent className="space-y-4 p-6">
                  <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      {service.totalReviews} reviews
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {service.estimatedDuration} min
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Starting from
                      </p>
                      <p className="text-xl font-bold text-primary">
                        ৳{service.price}
                      </p>
                    </div>
                    <Button
                      asChild
                      className="group/btn rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/25"
                    >
                      <Link href={`/services/${service.id}`}>
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-xl border-2 px-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5"
          >
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
