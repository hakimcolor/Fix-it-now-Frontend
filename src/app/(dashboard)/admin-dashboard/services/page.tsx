import Link from 'next/link';
import { Wrench, Eye, Star } from 'lucide-react';
import { getAllServicesss } from '@/app/(public)/_actions/getAllServices';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function AdminServicesPage() {
  const response = await getAllServicesss({ query: { limit: '1000' } });
  const services = response?.data ?? [];

  const available = services.filter(
    (s: { isAvailable: boolean }) => s.isAvailable
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Services</h1>
        <p className="text-muted-foreground">
          All services listed on the platform.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: 'Total Services',
            value: services.length,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
          },
          {
            label: 'Available',
            value: available,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
          },
          {
            label: 'Unavailable',
            value: services.length - available,
            color: 'text-red-600',
            bg: 'bg-red-50',
          },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`rounded-xl p-3 ${s.bg}`}>
                <Wrench className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-14" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No services found.
                  </TableCell>
                </TableRow>
              ) : (
                services.map(
                  (s: {
                    id: string;
                    title: string;
                    price: number;
                    isAvailable: boolean;
                    averageRating?: number;
                    createdAt: string;
                    category?: { name: string };
                  }) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium max-w-48 truncate">
                        {s.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {s.category?.name ?? '—'}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        ৳{s.price}
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1 text-sm">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          {s.averageRating?.toFixed(1) ?? '—'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            s.isAvailable
                              ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                              : 'bg-red-100 text-red-700 border-red-200'
                          }
                        >
                          {s.isAvailable ? 'Available' : 'Unavailable'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button asChild variant="ghost" size="icon">
                          <Link href={`/services/${s.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
