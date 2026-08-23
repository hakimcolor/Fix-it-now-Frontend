'use client';

import Link from 'next/link';
import { User, Wrench, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export type Role = 'CUSTOMER' | 'TECHNICIAN';

interface Props {
  onSelect: (role: Role) => void;
}

const roles = [
  {
    value: 'CUSTOMER' as Role,
    icon: User,
    title: 'Customer',
    description: 'Book qualified professionals for home services.',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    value: 'TECHNICIAN' as Role,
    icon: Wrench,
    title: 'Technician',
    description: 'List your skills, set availability, and earn.',
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  },
];

export default function RoleSelector({ onSelect }: Props) {
  return (
    <Card className="shadow-xl">
      <CardContent className="space-y-3 pt-6">
        {roles.map(({ value, icon: Icon, title, description, color }) => (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            className="group flex w-full items-center gap-4 rounded-xl border bg-background p-4 text-left transition-all hover:border-primary hover:bg-primary/5 hover:shadow-md"
          >
            <div className={`rounded-xl p-3 ${color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </button>
        ))}
      </CardContent>

      <CardFooter className="justify-center border-t pt-5">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
