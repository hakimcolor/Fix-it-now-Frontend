import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Star, User, Mail, Tag } from 'lucide-react';
import BookingModal from '../_components/BookingModal';
import { getMe } from '@/services/getMe';

// Backend response shape for /api/services/:id
interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;
  technicianProfileId: string;
  createdAt: string;
  updatedAt: string;
  // optional fields
  thumbnail?: string;
  isAvailable?: boolean;
  averageRating?: number;
  totalReviews?: number;
  estimatedDuration?: number;
  priceType?: string;
  category?: { id: string; name: string; description: string };
  technicianProfile?: {
    id: string;
    user?: { name: string; email: string };
  };
}

export default async function SingleServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [res, meRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`, {
      cache: 'no-store',
    }),
    getMe(),
  ]);

  if (!res.ok) notFound();

  const json = await res.json();
  const data: ServiceDetail = json?.data;

  if (!data) notFound();

  const isAuthenticated = meRes?.success === true;
  const techName = data.technicianProfile?.user?.name ?? 'Technician';
  const techEmail = data.technicianProfile?.user?.email;
  const categoryName = data.category?.name ?? 'Service';

  return (
    <div className="container mx-auto max-w-5xl py-10 px-4">
      {/* Back */}
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link href="/services">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* LEFT — Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Hero gradient banner */}
          <div className="h-48 w-full rounded-2xl bg-linear-to-br from-primary/20 via-primary/10 to-muted flex items-center justify-center">
            <div className="text-center">
              <Tag className="mx-auto h-12 w-12 text-primary/60" />
              <p className="mt-2 text-sm text-muted-foreground">
                {categoryName}
              </p>
            </div>
          </div>

          {/* Info card */}
          <Card>
            <CardContent className="space-y-5 p-6">
              {/* Category + availability badge */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{categoryName}</Badge>
                {data.isAvailable === true && (
                  <Badge className="bg-green-600 hover:bg-green-600">
                    Available
                  </Badge>
                )}
                {data.isAvailable === false && (
                  <Badge variant="destructive">Unavailable</Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold">{data.title}</h1>

              {/* Rating row if available */}
              {data.averageRating !== undefined && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span>
                    {(data.averageRating ?? 0).toFixed(1)}
                    {data.totalReviews !== undefined && (
                      <span className="ml-1 text-sm">
                        ({data.totalReviews} reviews)
                      </span>
                    )}
                  </span>
                </div>
              )}

              <div>
                <h2 className="mb-2 text-lg font-semibold">Description</h2>
                <p className="leading-7 text-muted-foreground">
                  {data.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Technician card */}
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Technician</h2>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                  {techName.charAt(0).toUpperCase()}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{techName}</span>
                  </div>
                  {techEmail && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{techEmail}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT — Booking card */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="space-y-5 p-6">
              {/* Price */}
              <div>
                <p className="text-sm text-muted-foreground">Service Price</p>
                <h2 className="text-4xl font-bold text-primary">
                  ৳{data.price}
                </h2>
                {data.priceType && (
                  <p className="text-sm text-muted-foreground">
                    {data.priceType === 'FIXED' ? 'Fixed Price' : 'Per Hour'}
                  </p>
                )}
              </div>

              {/* Info rows */}
              <div className="space-y-3 border-t pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{categoryName}</span>
                </div>
                {data.estimatedDuration && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">
                      {data.estimatedDuration} min
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Technician</span>
                  <span className="font-medium">{techName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posted</span>
                  <span className="font-medium">
                    {new Date(data.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Book button */}
              <BookingModal
                serviceId={data.id}
                isAuthenticated={isAuthenticated}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
