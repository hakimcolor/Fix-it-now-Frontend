import { Quote, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getAllReviews } from '@/app/(dashboard)/_actions/getAllReviews';

export default async function CustomerReviews() {
  const reviews = await getAllReviews().catch(() => []);

  if (!reviews.length) return null;

  return (
    <section className="relative py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/8 blur-[140px]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-primary"
          >
            Customer Reviews
          </Badge>
          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            Loved by Our Customers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover why homeowners trust FixItNow for fast, reliable, and
            professional home services.
          </p>
        </div>

        <Carousel opts={{ align: 'start', loop: true }} className="w-full">
          <CarouselContent>
            {reviews.map((review) => {
              const techName = review.technician?.user?.name ?? 'Technician';
              const initials = techName
                .split(' ')
                .map((w: string) => w[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);

              return (
                <CarouselItem
                  key={review.id}
                  className="md:basis-1/2 xl:basis-1/3"
                >
                  <Card className="group h-full rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                    <CardContent className="flex h-full flex-col p-8">
                      <Quote className="mb-5 h-8 w-8 text-primary/25" />

                      <p className="mb-6 flex-1 leading-7 text-muted-foreground">
                        &ldquo;{review.comment}&rdquo;
                      </p>

                      <div className="mb-5 flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        {Array.from({ length: 5 - review.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-muted-foreground/30"
                            />
                          )
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                          <AvatarImage
                            src={review.technician?.profilePhoto ?? ''}
                            alt={techName}
                          />
                          <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">{techName}</h3>
                          <p className="text-sm text-muted-foreground">
                            Technician
                          </p>
                        </div>
                        <Badge variant="outline" className="shrink-0 text-xs">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="-left-5 cursor-pointer transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground" />
          <CarouselNext className="-right-5 cursor-pointer transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground" />
        </Carousel>
      </div>
    </section>
  );
}
