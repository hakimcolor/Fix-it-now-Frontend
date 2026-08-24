import { getMe } from '@/services/getMe';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Mail,
  Shield,
  CalendarDays,
  Fingerprint,
  Clock3,
  User,
} from 'lucide-react';

export default async function AdminProfilePage() {
  const result = await getMe();

  if (!result?.success || !result?.data) {
    notFound();
  }

  const u = result.data;
  const initials = (u.name as string)
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const status = u.status ?? u.activeStatus ?? '';

  const fields = [
    { icon: <User className="h-5 w-5" />, label: 'Full Name', value: u.name },
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'Email Address',
      value: u.email,
    },
    { icon: <Shield className="h-5 w-5" />, label: 'Role', value: u.role },
    {
      icon: <CalendarDays className="h-5 w-5" />,
      label: 'Member Since',
      value: new Date(u.createdAt).toLocaleDateString(),
    },
    {
      icon: <Clock3 className="h-5 w-5" />,
      label: 'Last Updated',
      value: new Date(u.updatedAt).toLocaleDateString(),
    },
    {
      icon: <Fingerprint className="h-5 w-5" />,
      label: 'Account ID',
      value: `${(u.id as string).slice(0, 12)}…`,
    },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header card */}
      <Card>
        <CardHeader className="items-center text-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-linear-to-br from-rose-500 to-orange-400 text-3xl font-bold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          <CardTitle className="mt-4 text-2xl">{u.name}</CardTitle>
          <CardDescription>{u.email}</CardDescription>

          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Badge className="bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100">
              {u.role}
            </Badge>
            <Badge
              variant="outline"
              className={
                status === 'ACTIVE'
                  ? 'border-green-500/50 text-green-600'
                  : 'border-muted text-muted-foreground'
              }
            >
              {status}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Details card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>
            Your administrator account information.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div
              key={f.label}
              className="flex items-start gap-4 rounded-lg border p-4"
            >
              <div className="rounded-md bg-primary/10 p-2 text-primary">
                {f.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">{f.label}</p>
                <p className="mt-1 font-medium break-all">
                  {f.value as string}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
