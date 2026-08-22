// import {
//   Calendar,
//   CalendarClock,
//   Clock3,
//   Ban,
// } from "lucide-react";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import WeeklySchedule from "../../_components/WeeklySchedule";
// import AvailabilityCalendar from "../../_components/AvailabilityCalendar";
// import TimeSlots from "../../_components/TimeSlots";
// import AvailabilityRules from "../../_components/AvailabilityRules";
// import UpcomingAvailableSlots from "../../_components/UpcomingAvailableSlots";

// const stats = [
//   {
//     title: "Available Days",
//     value: 22,
//     icon: Calendar,
//     color: "text-green-600",
//     description: "Working days this month",
//   },
//   {
//     title: "Available Slots",
//     value: 148,
//     icon: Clock3,
//     color: "text-blue-600",
//     description: "Open booking slots",
//   },
//   {
//     title: "Booked Slots",
//     value: 37,
//     icon: CalendarClock,
//     color: "text-orange-500",
//     description: "Already reserved",
//   },
//   {
//     title: "Unavailable Days",
//     value: 8,
//     icon: Ban,
//     color: "text-red-500",
//     description: "Days marked unavailable",
//   },
// ];

// export default function AvailabilityPage() {
//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">
//           Availability
//         </h1>

//         <p className="mt-2 text-muted-foreground">
//           Manage your working schedule and booking slots.
//         </p>
//       </div>

//       {/* Statistics */}
//       <section>
//         <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           {stats.map((stat) => {
//             const Icon = stat.icon;

//             return (
//               <Card
//                 key={stat.title}
//                 className="transition-all hover:-translate-y-1 hover:shadow-md"
//               >
//                 <CardHeader className="flex flex-row items-center justify-between pb-2">
//                   <CardTitle className="text-sm font-medium text-muted-foreground">
//                     {stat.title}
//                   </CardTitle>

//                   <div className="rounded-lg bg-muted p-2">
//                     <Icon className={`h-5 w-5 ${stat.color}`} />
//                   </div>
//                 </CardHeader>

//                 <CardContent>
//                   <div className="text-3xl font-bold">
//                     {stat.value}
//                   </div>

//                   <p className="mt-1 text-sm text-muted-foreground">
//                     {stat.description}
//                   </p>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </section>

//       {/* Weekly Schedule */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Weekly Schedule</CardTitle>
//         </CardHeader>

//         <CardContent>
//           {/* WeeklySchedule component */}
//           <WeeklySchedule/>
//         </CardContent>
//       </Card>

//       {/* Calendar */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Availability Calendar</CardTitle>
//         </CardHeader>

//         <CardContent>
//           {/* Calendar component */}
//           <AvailabilityCalendar/>
//         </CardContent>
//       </Card>

//       {/* Time Slots */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Time Slots</CardTitle>
//         </CardHeader>

//         <CardContent>
//           {/* TimeSlots component */}
//           <TimeSlots/>
//         </CardContent>
//       </Card>

//       {/* Availability Rules */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Availability Rules</CardTitle>
//         </CardHeader>

//         <CardContent>
//           {/* AvailabilityRules component */}
//           <AvailabilityRules/>
//         </CardContent>
//       </Card>

//       {/* Upcoming Available Slots */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Upcoming Available Slots</CardTitle>
//         </CardHeader>

//         <CardContent>
//           {/* UpcomingSlots component */}
//           <UpcomingAvailableSlots/>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }




























import {
  Ban,
  Calendar,
  CalendarClock,
  Clock3,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AvailabilityRules from "../../_components/AvailabilityRules";
import UpcomingAvailableSlots from "../../_components/UpcomingAvailableSlots";

const stats = [
  {
    title: "Available Days",
    value: 22,
    icon: Calendar,
    color: "text-green-600",
    description: "Working days this month",
  },
  {
    title: "Available Slots",
    value: 148,
    icon: Clock3,
    color: "text-blue-600",
    description: "Open booking slots",
  },
  {
    title: "Booked Slots",
    value: 37,
    icon: CalendarClock,
    color: "text-orange-500",
    description: "Already reserved",
  },
  {
    title: "Unavailable Days",
    value: 8,
    icon: Ban,
    color: "text-red-500",
    description: "Days marked unavailable",
  },
];

export default function AvailabilityPage() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Availability
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your working schedule and booking slots.
        </p>
      </div>

      {/* Statistics */}

      <section>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card
                key={stat.title}
                className="transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>

                  <div className="rounded-lg bg-muted p-2">
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="text-3xl font-bold">
                    {stat.value}
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Row 2 */}
      <section className="grid gap-6 xl:grid-cols-2">
        <AvailabilityRules />
        <UpcomingAvailableSlots />
      </section>
    </div>
  );
}