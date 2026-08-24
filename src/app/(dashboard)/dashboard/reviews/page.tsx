import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, MessageSquare } from 'lucide-react';
import { getAllReviews, Review } from '../../_actions/getAllReviews';
import { getMe } from '@/services/getMe';

export default async function ReviewsPage() {
  const [allReviews, me] = await Promise.all([getAllReviews(), getMe()]);

  const customerId = me?.data?.id;
  const reviews: Review[] = customerId
    ? allReviews.filter((r) => r.customerId === customerId)
    : allReviews;

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <MessageSquare className="h-6 w-6 text-primary" />
            <div>
              <CardTitle className="text-2xl">My Reviews</CardTitle>
              <CardDescription>
                Reviews you&apos;ve submitted for technicians.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Star className="mb-4 h-14 w-14 text-muted-foreground" />
              <h3 className="text-lg font-semibold">No Reviews Yet</h3>
              <p className="text-muted-foreground">
                After completing a service, you can leave a review for the
                technician.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Technician</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {reviews.map((review) => {
                  const technicianName =
                    review.technician?.user?.name ?? 'Unknown Technician';

                  return (
                    <TableRow key={review.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={review.technician?.profilePhoto || ''}
                              alt={technicianName}
                            />
                            <AvatarFallback>
                              {technicianName
                                .split(' ')
                                .map((word) => word[0])
                                .join('')
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{technicianName}</p>
                            <p className="text-xs text-muted-foreground">
                              Technician
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="secondary">
                          {review.booking?.service?.title ?? 'N/A'}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-sm text-muted-foreground">
                            {review.rating}/5
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="max-w-xs">
                        <p className="truncate text-sm text-muted-foreground">
                          {review.comment || '—'}
                        </p>
                      </TableCell>

                      <TableCell>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                          Published
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
