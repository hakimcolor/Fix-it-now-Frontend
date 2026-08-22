"use client";

import { Bell, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserDropdown from "./UserDropdown";
import { ApiResponse } from "../types/dashboard.types";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";

interface Props {
  user: ApiResponse;
}

export default function NavbarActions({
  user,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <ThemeSwitcher/>
      
      <Button variant="ghost" size="icon">
        <Mail className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="relative"
      >
        <Bell className="h-5 w-5" />

        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
          3
        </span>
      </Button>

      <UserDropdown user={user} />
    </div>
  );
}