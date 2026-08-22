// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar";

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// import { Eye, Star } from "lucide-react";
// import { getAllReviews } from "../../_actions/getAllReviews";

// const reviews = [
//   {
//     id: "1",
//     rating: 5,
//     comment:
//       "Excellent service! The technician arrived on time, fixed the AC quickly, and explained everything clearly.",
//     createdAt: "2026-07-31",
//     technician: {
//       name: "John Doe",
//       profilePhoto: "https://i.pravatar.cc/150?img=12",
//     },
//     booking: {
//       service: {
//         title: "AC Repair",
//       },
//     },
//   },
//   {
//     id: "2",
//     rating: 4,
//     comment:
//       "Very professional. Fixed the leaking pipe within 30 minutes. Highly recommended.",
//     createdAt: "2026-07-25",
//     technician: {
//       name: "Alex Smith",
//       profilePhoto: "https://i.pravatar.cc/150?img=25",
//     },
//     booking: {
//       service: {
//         title: "Plumbing",
//       },
//     },
//   },
//   {
//     id: "3",
//     rating: 3,
//     comment:
//       "The repair was okay, but the technician arrived a bit late.",
//     createdAt: "2026-07-18",
//     technician: {
//       name: "Michael Brown",
//       profilePhoto: "https://i.pravatar.cc/150?img=33",
//     },
//     booking: {
//       service: {
//         title: "Washing Machine Repair",
//       },
//     },
//   },
// ];


// http://localhost:5000/api/reviews

// export default function ReviewsPage() {

//   // const reviews = getAllReviews();
//   return (
//     <div className="container mx-auto py-8">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl">My Reviews</CardTitle>
//           <CardDescription>
//             View all the reviews you've submitted for technicians.
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Technician</TableHead>
//                 <TableHead>Service</TableHead>
//                 <TableHead>Rating</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="text-right">Action</TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {reviews.length > 0 ? (
//                 reviews.map((review) => (
//                   <TableRow key={review.id}>
//                     {/* Technician */}
//                     <TableCell>
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-10 w-10">
//                           <AvatarImage
//                             src={review.technician.profilePhoto}
//                             alt={review.technician.name}
//                           />
//                           <AvatarFallback>
//                             {review.technician.name
//                               .split(" ")
//                               .map((n) => n[0])
//                               .join("")}
//                           </AvatarFallback>
//                         </Avatar>

//                         <div>
//                           <p className="font-medium">
//                             {review.technician.name}
//                           </p>
//                           <p className="text-sm text-muted-foreground">
//                             Technician
//                           </p>
//                         </div>
//                       </div>
//                     </TableCell>

//                     {/* Service */}
//                     <TableCell>
//                       <Badge variant="secondary">
//                         {review.booking.service.title}
//                       </Badge>
//                     </TableCell>

//                     {/* Rating */}
//                     <TableCell>
//                       <div className="flex items-center gap-1">
//                         {Array.from({ length: 5 }).map((_, index) => (
//                           <Star
//                             key={index}
//                             className={`h-4 w-4 ${
//                               index < review.rating
//                                 ? "fill-yellow-400 text-yellow-400"
//                                 : "text-muted-foreground"
//                             }`}
//                           />
//                         ))}

//                         <span className="ml-2 text-sm text-muted-foreground">
//                           {review.rating}/5
//                         </span>
//                       </div>
//                     </TableCell>

//                     {/* Date */}
//                     <TableCell>
//                       {new Date(review.createdAt).toLocaleDateString()}
//                     </TableCell>

//                     {/* Status */}
//                     <TableCell>
//                       <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
//                         Published
//                       </Badge>
//                     </TableCell>

//                     {/* Action */}
//                     <TableCell className="text-right">
//                       <Button variant="outline" size="sm">
//                         <Eye className="mr-2 h-4 w-4" />
//                         View
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={7}
//                     className="h-40 text-center text-muted-foreground"
//                   >
//                     No reviews found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }






































import React from "react";
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

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Eye, Star } from "lucide-react";
import { getAllReviews, Review } from "../../_actions/getAllReviews";



export default async function ReviewsPage() {
  const reviews: Review[] = await getAllReviews();

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">My Reviews</CardTitle>
          <CardDescription>
            View all the reviews you've submitted for technicians.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Technician</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {reviews.length > 0 ? (
                reviews.map((review) => {
                  const technicianName =
                    review.technician?.user?.name ?? "Unknown Technician";

                  return (
                    <TableRow key={review.id}>
                      {/* Technician */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={
                                review.technician?.profilePhoto ||
                                "/placeholder-user.jpg"
                              }
                              alt={technicianName}
                            />
                            <AvatarFallback>
                              {technicianName
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <p className="font-medium">{technicianName}</p>
                            <p className="text-sm text-muted-foreground">
                              Technician
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Service */}
                      <TableCell>
                        <Badge variant="secondary">
                          {review.title || "N/A"}
                        </Badge>
                      </TableCell>

                      {/* Rating */}
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`h-4 w-4 ${
                                index < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}

                          <span className="ml-2 text-sm text-muted-foreground">
                            {review.rating}/5
                          </span>
                        </div>
                      </TableCell>

                      {/* Date */}
                      <TableCell>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          Published
                        </Badge>
                      </TableCell>

                      {/* Action */}
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-40 text-center text-muted-foreground"
                  >
                    No reviews found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}