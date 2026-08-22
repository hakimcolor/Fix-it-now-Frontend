
// import { getTechnicianById } from "../../_actions/getTechnicianById";

// import { getMe } from "@/services/getMe";
// import { getTechnicianServices } from "../../_actions/getTechnicianServices";



// export default async function TechnicianServicesPage() {

//   const me = await getMe();
//   const technicianId = me.data?.profile?.technicianProfile?.id;
//   const result = await getTechnicianById(technicianId);

//   const allServices = await getTechnicianServices(technicianId);


//   return (
//     <div>
//       <pre>{JSON.stringify(result, null, 2)}</pre>
//       <pre>{JSON.stringify(allServices, null, 2)}</pre>
//     </div>
//   );
// }


// dashboard/
// └── technician/
//     └── services/
//         ├── page.tsx                 // List all services
//         ├── create/
//         │   └── page.tsx             // Create service
//         ├── [serviceId]/
//         │   ├── page.tsx             // Service details
//         │   ├── edit/
//         │   │   └── page.tsx         // Edit service
//         │   └── slots/
//         │       ├── page.tsx         // Manage booking slots
//         │       └── create/
//         │           └── page.tsx     // Add slot





















import Image from "next/image";
import Link from "next/link";

import { getMe } from "@/services/getMe";
import { getTechnicianById } from "../../_actions/getTechnicianById";
import { getTechnicianServices } from "../../_actions/getTechnicianServices";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Star,
  Clock,
  Plus,
  Pencil,
  CalendarDays,
  Trash2,
} from "lucide-react";
import DeleteServiceButton from "../../_components/DeleteServiceButton";



export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BookingSlot {
  id: string;
  serviceId: string;
  date: string;
  startsAt: string;
  endsAt: string;
  isAvailable: boolean;
  isBooked: boolean;
  bookingId: string | null;
  note: string | null;
  bookingDeadline: string;
  maxBookings: number;
  bookedCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TechnicianService {
  id: string;
  technicianId: string;
  categoryId: string;
  title: string;
  description: string;
  price: string;
  priceType: "FIXED" | "HOURLY";
  estimatedDuration: number;
  thumbnail: string;
  isAvailable: boolean;
  averageRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  bookingSlots: BookingSlot[];
}

export default async function TechnicianServicesPage() {
  const me = await getMe();

  const technicianId = me.data?.profile?.technicianProfile?.id;

  if (!technicianId) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Technician profile not found.
      </div>
    );
  }

  const technician = await getTechnicianById(technicianId);
  const response = await getTechnicianServices(technicianId);

  const services = response?.data || [];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Services</h1>
          <p className="text-muted-foreground">
            Manage your offered services.
          </p>
        </div>

        <Button asChild>
          <Link href="/technician-dashboard/services/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Link>
        </Button>
      </div>

      {/* Technician Summary */}

      <Card>
        <CardHeader>
          <CardTitle>{technician?.data?.displayName}</CardTitle>
          <CardDescription>
            {technician?.data?.profession}
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Services
            </p>
            <p className="text-2xl font-bold">{services.length}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Experience
            </p>
            <p className="text-2xl font-bold">
              {technician?.data?.yearsOfExperience ?? 0} yrs
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Rating
            </p>
            <p className="text-2xl font-bold">
              {technician?.data?.averageRating ?? 0}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Reviews
            </p>
            <p className="text-2xl font-bold">
              {technician?.data?.totalReviews ?? 0}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Services Table */}

      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
          <CardDescription>
            All services you currently provide.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Slots</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center h-32 text-muted-foreground"
                  >
                    No services found.
                  </TableCell>
                </TableRow>
              ) : (
                services.map((service: TechnicianService) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src={service.thumbnail}
                          alt={service.title}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />

                        <div>
                          <p className="font-medium">
                            {service.title}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">
                        {service.category.name}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      ৳{service.price}

                      <p className="text-xs text-muted-foreground">
                        {service.priceType}
                      </p>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {service.estimatedDuration} min
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                        {service.averageRating}

                        <span className="text-muted-foreground text-xs">
                          ({service.totalReviews})
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      {service.bookingSlots.length}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          service.isAvailable
                            ? "default"
                            : "destructive"
                        }
                      >
                        {service.isAvailable
                          ? "Available"
                          : "Unavailable"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                        >
                          <Link
                            href={`/technician-dashboard/services/${service.id}/slots`}
                          >
                            <CalendarDays className="h-4 w-4" />
                          </Link>
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                        >
                          <Link
                            href={`/technician-dashboard/services/${service.id}/edit`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>

                        {/* <Button
                          variant="destructive"
                          size="icon"
                        >
                          <Link
                            href={`/technician-dashboard/services/${service.id}/delete`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Link>
                        </Button> */}

                        <div>
                          <DeleteServiceButton
                            serviceId={service.id}
                          />
                        </div>
                      </div>
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


