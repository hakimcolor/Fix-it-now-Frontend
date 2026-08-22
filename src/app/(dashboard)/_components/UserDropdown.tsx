"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
  User,
  Settings,
  LogOut,
  Home,
} from "lucide-react";

import { logout } from "@/services/logout";
import { ApiResponse } from "../types/dashboard.types";

interface Props {
  user: ApiResponse;
}

export default function UserDropdown({ user }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      toast.loading("Logging out...", {
        id: "logout",
      });

      await logout();

      toast.success("Logged out successfully!", {
        id: "logout",
      });

      router.replace("/login");
    } catch {
      toast.error("Logout failed", {
        id: "logout",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="" />
            <AvatarFallback>
              {user.data.profile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="space-y-1">
            <p className="font-medium">
              {user.data.profile.name}
            </p>

            <p className="text-xs text-muted-foreground">
              {user.data.profile.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}