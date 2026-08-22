"use client";

import { useState } from "react";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DaySchedule {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

const initialSchedule: DaySchedule[] = [
  {
    day: "Monday",
    enabled: true,
    startTime: "09:00",
    endTime: "18:00",
  },
  {
    day: "Tuesday",
    enabled: true,
    startTime: "09:00",
    endTime: "18:00",
  },
  {
    day: "Wednesday",
    enabled: true,
    startTime: "09:00",
    endTime: "18:00",
  },
  {
    day: "Thursday",
    enabled: true,
    startTime: "09:00",
    endTime: "18:00",
  },
  {
    day: "Friday",
    enabled: true,
    startTime: "09:00",
    endTime: "18:00",
  },
  {
    day: "Saturday",
    enabled: true,
    startTime: "10:00",
    endTime: "15:00",
  },
  {
    day: "Sunday",
    enabled: false,
    startTime: "",
    endTime: "",
  },
];

export default function WeeklySchedule() {
  const [schedule, setSchedule] =
    useState<DaySchedule[]>(initialSchedule);

  const updateSchedule = (
    index: number,
    field: keyof DaySchedule,
    value: boolean | string
  ) => {
    setSchedule((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = () => {
    console.log(schedule);

    // TODO:
    // await updateWeeklySchedule(schedule)
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>Weekly Schedule</CardTitle>

          <CardDescription>
            Configure your regular working days and hours.
          </CardDescription>
        </div>

        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Schedule
        </Button>
      </CardHeader>

      <CardContent>
        {/* Desktop */}

        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-48">Day</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {schedule.map((item, index) => (
                <TableRow key={item.day}>
                  <TableCell className="font-medium">
                    {item.day}
                  </TableCell>

                  <TableCell>
                    <Switch
                      checked={item.enabled}
                      onCheckedChange={(checked) =>
                        updateSchedule(index, "enabled", checked)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="time"
                      value={item.startTime}
                      disabled={!item.enabled}
                      onChange={(e) =>
                        updateSchedule(
                          index,
                          "startTime",
                          e.target.value
                        )
                      }
                      className="max-w-[160px]"
                    />
                  </TableCell>

                  <TableCell>
                    <Input
                      type="time"
                      value={item.endTime}
                      disabled={!item.enabled}
                      onChange={(e) =>
                        updateSchedule(
                          index,
                          "endTime",
                          e.target.value
                        )
                      }
                      className="max-w-[160px]"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile */}

        <div className="space-y-4 md:hidden">
          {schedule.map((item, index) => (
            <Card key={item.day}>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    {item.day}
                  </h3>

                  <Switch
                    checked={item.enabled}
                    onCheckedChange={(checked) =>
                      updateSchedule(index, "enabled", checked)
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm text-muted-foreground">
                      Start
                    </label>

                    <Input
                      type="time"
                      value={item.startTime}
                      disabled={!item.enabled}
                      onChange={(e) =>
                        updateSchedule(
                          index,
                          "startTime",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm text-muted-foreground">
                      End
                    </label>

                    <Input
                      type="time"
                      value={item.endTime}
                      disabled={!item.enabled}
                      onChange={(e) =>
                        updateSchedule(
                          index,
                          "endTime",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}