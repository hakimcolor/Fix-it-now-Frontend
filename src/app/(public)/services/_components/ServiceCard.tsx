import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, User, Tag } from 'lucide-react';
import { IService } from '@/types/types.service';

export default function ServiceCard({ service }: { service: IService }) {
  const techName = service.technicianProfile?.user?.name ?? 'Technician';
  const categoryName = service.category?.name ?? 'Service';

  return (
    <Card className="group overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Thumbnail or gradient fallback */}
      <div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-primary/10 to-muted">
        {service.thumbnail ? (
          <Image
            src={service.thumbnail}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Tag className="h-12 w-12 text-primary/30" />
          </div>
        )}
        <Badge className="absolute left-3 top-3 bg-primary/90">
          {categoryName}
        </Badge>
      </div>

      <CardContent className="space-y-3 p-5">
        {/* Title */}
        <h3 className="line-clamp-1 text-lg font-semibold">{service.title}</h3>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {service.description}
        </p>

        {/* Technician */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          <span>{techName}</span>
        </div>

        {/* Rating if available */}
        {service.averageRating !== undefined && (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">
              {(service.averageRating ?? 0).toFixed(1)}
            </span>
            {service.totalReviews !== undefined && (
              <span className="text-xs text-muted-foreground">
                ({service.totalReviews})
              </span>
            )}
          </div>
        )}

        {/* Price & Button */}
        <div className="flex items-end justify-between pt-1">
          <div>
            <span className="text-2xl font-bold text-primary">
              ৳{service.price}
            </span>
            {service.priceType && (
              <p className="text-xs text-muted-foreground">
                {service.priceType === 'FIXED' ? 'Fixed Price' : 'Per Hour'}
              </p>
            )}
          </div>

          <Button asChild size="sm">
            <Link href={`/services/${service.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
