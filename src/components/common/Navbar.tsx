'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  User,
  LogOut,
  Home,
  Search,
  Users,
  LayoutDashboard,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ThemeSwitcher from './ThemeSwitcher';
import { logout } from '@/services/logout';
import { toast } from 'sonner';
import SiteLogo from './SiteLogo';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/services', label: 'Services', icon: Search },
  { href: '/find-technicians', label: 'Find Technicians', icon: Users },
];

// Role → avatar gradient
const roleGradient: Record<string, string> = {
  ADMIN: 'from-rose-500 to-orange-500',
  TECHNICIAN: 'from-blue-500 to-violet-500',
  CUSTOMER: 'from-teal-400 to-emerald-500',
};

type IUser = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  };
};

export default function Navbar({ user }: { user: IUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);

  const profile = user?.success ? user?.data : null;
  const isLoggedIn = !!profile;

  const initials = profile?.name
    ? profile.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  const gradient =
    roleGradient[profile?.role ?? ''] ?? 'from-primary to-primary/70';

  const dashboardLink =
    profile?.role === 'ADMIN'
      ? '/admin-dashboard'
      : profile?.role === 'TECHNICIAN'
        ? '/technician-dashboard'
        : '/dashboard';

  const profileLink =
    profile?.role === 'TECHNICIAN'
      ? '/technician-dashboard/profile'
      : '/dashboard/profile';

  const handleLogout = () => setShowLogoutDialog(true);

  const confirmLogout = async () => {
    try {
      toast.loading('Logging out...', { id: 'logout' });
      await logout();
      toast.success('Logged out successfully!', {
        id: 'logout',
        description: 'See you soon 👋',
      });
      router.replace('/login');
    } catch {
      toast.error('Failed to logout', { id: 'logout' });
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <SiteLogo />

            {/* Desktop nav links */}
            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group relative flex items-center gap-1.5 text-sm font-medium transition-colors duration-200',
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    {item.label}
                    <span
                      className={cn(
                        'absolute -bottom-5.25 left-0 h-0.5 rounded-full bg-primary transition-all duration-300',
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      )}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <ThemeSwitcher />

              {isLoggedIn && profile ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex h-9 items-center gap-2 rounded-full px-2 pr-3 hover:bg-accent"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback
                          className={`bg-linear-to-br ${gradient} text-xs font-bold text-white`}
                        >
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden max-w-25 truncate text-sm font-medium sm:block">
                        {profile.name}
                      </span>
                      <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-60" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex items-center gap-3 py-1">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback
                            className={`bg-linear-to-br ${gradient} text-sm font-bold text-white`}
                          >
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold leading-none">
                            {profile.name}
                          </p>
                          <p className="mt-1 text-xs leading-none text-muted-foreground">
                            {profile.email}
                          </p>
                          <span className="mt-1.5 inline-flex w-fit items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                            {profile.role}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link href={dashboardLink} className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={profileLink} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden items-center gap-2 md:flex">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </div>
              )}

              {/* Mobile hamburger */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col gap-6 pt-6">
                    <SiteLogo />

                    {/* User info in mobile */}
                    {isLoggedIn && profile && (
                      <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/40 p-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback
                            className={`bg-linear-to-br ${gradient} font-bold text-white`}
                          >
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold">
                            {profile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {profile.role}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Nav links */}
                    <div className="flex flex-col gap-1">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                            pathname === item.href
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    <div className="mt-auto border-t pt-4">
                      {isLoggedIn && profile ? (
                        <div className="flex flex-col gap-1">
                          <Link
                            href={dashboardLink}
                            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-muted"
                          >
                            <LayoutDashboard className="h-4 w-4" /> Dashboard
                          </Link>
                          <Link
                            href={profileLink}
                            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-muted"
                          >
                            <User className="h-4 w-4" /> Profile
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10"
                          >
                            <LogOut className="h-4 w-4" /> Log out
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2 px-2">
                          <Button variant="outline" asChild className="w-full">
                            <Link href="/login">Log in</Link>
                          </Button>
                          <Button asChild className="w-full">
                            <Link href="/register">Sign Up</Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log out of your account?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be signed out and redirected to the login page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmLogout}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
