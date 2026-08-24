'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { navigation } from '../_config/dashboard-navigation';
import SiteLogo from '@/components/common/SiteLogo';
import { logout } from '@/services/logout';
import { toast } from 'sonner';
import { ApiResponse } from '../types/dashboard.types';

const roleColors: Record<string, string> = {
  ADMIN: 'bg-red-500/15 text-red-600 dark:text-red-400',
  TECHNICIAN: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  CUSTOMER: 'bg-green-500/15 text-green-600 dark:text-green-400',
};

interface SidebarContentProps {
  role: 'customer' | 'technician' | 'admin';
  user?: ApiResponse;
  onClose?: () => void;
}

export default function SidebarContent({
  role,
  user,
  onClose,
}: SidebarContentProps) {
  const pathname = usePathname();

  const navItems = navigation[role];

  const name = user?.data?.name ?? '';
  const email = user?.data?.email ?? '';
  const photo = user?.data?.profilePhoto ?? '';
  const userRole = user?.data?.role ?? role.toUpperCase();
  const userStatus = user?.data?.status ?? user?.data?.activeStatus ?? '';
  const initials = name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = async () => {
    try {
      await logout();
      toast.error('Logout successfull.');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to logout');
    }
  };

  return (
    <div className="flex h-full flex-col w-full">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b px-4 py-4">
        <SiteLogo />
      </div>

      <ScrollArea className="flex-1 px-3 py-6">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <Separator className="my-6" />
      </ScrollArea>

      {/* User info + role badge */}
      {name && (
        <div className="border-t px-4 py-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={photo} alt={name} />
              <AvatarFallback className="text-sm">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{name}</p>
              <p className="text-xs text-muted-foreground truncate">{email}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                'px-2.5 py-0.5 rounded-full text-xs font-medium',
                roleColors[userRole] ?? 'bg-muted text-muted-foreground'
              )}
            >
              {userRole}
            </span>
            {userStatus && (
              <Badge
                variant="outline"
                className={cn(
                  'text-xs',
                  userStatus === 'ACTIVE'
                    ? 'border-green-500/50 text-green-600 dark:text-green-400'
                    : 'border-muted text-muted-foreground'
                )}
              >
                {userStatus}
              </Badge>
            )}
          </div>
        </div>
      )}

      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
