"use client";

import { Save, Settings2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AvailabilityRules() {
  const [allowWeekendBookings, setAllowWeekendBookings] =
    useState(true);

  const [autoAcceptBookings, setAutoAcceptBookings] =
    useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings2 className="h-5 w-5" />
          Availability Rules
        </CardTitle>

        <CardDescription>
          Configure how customers can book your services.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Settings */}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Slot Duration */}

          <div className="space-y-2">
            <Label>Slot Duration</Label>

            <Select defaultValue="60">
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="30">30 Minutes</SelectItem>
                <SelectItem value="45">45 Minutes</SelectItem>
                <SelectItem value="60">60 Minutes</SelectItem>
                <SelectItem value="90">90 Minutes</SelectItem>
                <SelectItem value="120">120 Minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Break Time */}

          <div className="space-y-2">
            <Label>Break Between Jobs (Minutes)</Label>

            <Input
              type="number"
              defaultValue={15}
              min={0}
            />
          </div>

          {/* Max Jobs */}

          <div className="space-y-2">
            <Label>Maximum Jobs Per Day</Label>

            <Input
              type="number"
              defaultValue={8}
              min={1}
            />
          </div>

          {/* Advance Booking */}

          <div className="space-y-2">
            <Label>Maximum Advance Booking (Days)</Label>

            <Input
              type="number"
              defaultValue={30}
              min={1}
            />
          </div>

          {/* Minimum Notice */}

          <div className="space-y-2">
            <Label>Minimum Booking Notice (Hours)</Label>

            <Input
              type="number"
              defaultValue={2}
              min={0}
            />
          </div>

          {/* Buffer */}

          <div className="space-y-2">
            <Label>Daily Working Hours</Label>

            <Input
              defaultValue="09:00 AM - 06:00 PM"
            />
          </div>
        </div>

        {/* Switches */}

        <div className="space-y-5 rounded-lg border p-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">
                Allow Weekend Bookings
              </h4>

              <p className="text-sm text-muted-foreground">
                Customers can book Saturday and Sunday.
              </p>
            </div>

            <Switch
              checked={allowWeekendBookings}
              onCheckedChange={setAllowWeekendBookings}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">
                Auto Accept Bookings
              </h4>

              <p className="text-sm text-muted-foreground">
                Automatically accept incoming booking requests.
              </p>
            </div>

            <Switch
              checked={autoAcceptBookings}
              onCheckedChange={setAutoAcceptBookings}
            />
          </div>
        </div>

        {/* Save */}

        <div className="flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Rules
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}