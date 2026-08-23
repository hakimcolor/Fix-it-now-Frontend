import {
  Home,
  Wrench,
  Calendar,
  User,
  Star,
  Users,
  LayoutGrid,
  CreditCard,
  DollarSign,
} from 'lucide-react';

export const navigation = {
  customer: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Bookings', href: '/dashboard/my-bookings', icon: Calendar },
    { name: 'My Payments', href: '/dashboard/my-payments', icon: CreditCard },
    { name: 'My Reviews', href: '/dashboard/reviews', icon: Star },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
  ],

  technician: [
    { name: 'Dashboard', href: '/technician-dashboard', icon: Home },
    {
      name: 'My Services',
      href: '/technician-dashboard/services',
      icon: Wrench,
    },
    {
      name: 'Availability',
      href: '/technician-dashboard/availability',
      icon: Calendar,
    },
    {
      name: 'Bookings',
      href: '/technician-dashboard/bookings',
      icon: Calendar,
    },
    { name: 'Profile', href: '/technician-dashboard/profile', icon: User },
    {
      name: 'Earnings',
      href: '/technician-dashboard/earnings',
      icon: DollarSign,
    },
  ],

  admin: [
    { name: 'Dashboard', href: '/admin-dashboard', icon: Home },
    { name: 'Users', href: '/admin-dashboard/users', icon: Users },
    { name: 'Bookings', href: '/admin-dashboard/bookings', icon: Calendar },
    {
      name: 'Categories',
      href: '/admin-dashboard/categories',
      icon: LayoutGrid,
    },
    { name: 'Payments', href: '/admin-dashboard/payments', icon: CreditCard },
  ],
} as const;
