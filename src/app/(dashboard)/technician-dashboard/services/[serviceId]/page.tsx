import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Pencil,
  Star,
  Tag,
} from 'lucide-react';

import { getServiceById } from '@/app/(dashboard)/_actions/getServiceById';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Props = { params: Promise<{ serviceId: string }> };

export default async function TechnicianServiceDetailPage({ params }: Props) {
  const { serviceId } = await params;
  const service = await getServiceById(serviceId);

  if (!service) notFound();

  const slots =
    (service.bookingSlots as {
      id: string;
      date: string;
      startsAt: string;
      endsAt: string;
      isAvailable: boolean;
      isBooked: boolean;
      maxBookings: number;
      bookedCount: number;
    }[]) ?? [];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm">
          <Link href="/technician-dashboard/services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href={`/technician-dashboard/services/${serviceId}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Service
          </Link>
        </Button>
      </div>

      {/* Service overview */}
      <Card>
        <CardContent className="p-0">
          {service.thumbnail && (
            <div className="relative h-56 w-full overflow-hidden rounded-t-xl">
              <Image
                src={service.thumbnail}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="space-y-4 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold">{service.title}</h1>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{service.category.name}</Badge>
                  <Badge
                    variant={service.isAvailable ? 'default' : 'destructive'}
                  >
                    {service.isAvailable ? 'Available' : 'Unavailable'}
                  </Badge>
                  <Badge variant="outline">{service.priceType}</Badge>
                </div>
              </div>
              <p className="text-3xl font-bold text-primary">
                ৳{service.price}
              </p>
            </div>

            <p className="text-muted-foreground">{service.description}</p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{service.estimatedDuration} min estimated</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>
                  {service.averageRating.toFixed(1)} ({service.totalReviews}{' '}
                  reviews)
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span>{service.category.name}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking slots */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Booking Slots</CardTitle>
          <Button asChild size="sm">
            <Link href={`/technician-dashboard/services/${serviceId}/slots`}>
              <CalendarDays className="mr-2 h-4 w-4" />
              Add Slot
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Max</TableHead>
                <TableHead>Booked</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slots.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No booking slots yet.
                  </TableCell>
                </TableRow>
              ) : (
                slots.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell>
                      {new Date(slot.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(slot.startsAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>
                    <TableCell>
                      {new Date(slot.endsAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>
                    <TableCell>{slot.maxBookings}</TableCell>
                    <TableCell>{slot.bookedCount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          slot.isBooked
                            ? 'destructive'
                            : slot.isAvailable
                              ? 'default'
                              : 'secondary'
                        }
                      >
                        {slot.isBooked
                          ? 'Booked'
                          : slot.isAvailable
                            ? 'Available'
                            : 'Unavailable'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
