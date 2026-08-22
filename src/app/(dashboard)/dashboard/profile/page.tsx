import { getMe } from '@/services/getMe';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Mail,
  Phone,
  Shield,
  CalendarDays,
  Clock3,
  User,
  KeyRound,
  Pencil,
  Fingerprint,
} from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function CustomerProfilePage() {
  const result = await getMe();

  if (!result?.success || !result?.data?.profile) {
    notFound();
  }

  const profile = result.data.profile;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Card>
        <CardHeader className="items-center text-center">
          <Avatar className="h-28 w-28">
            <AvatarFallback className="text-4xl">
              {profile.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <CardTitle className="mt-4 text-3xl">{profile.name}</CardTitle>

          <CardDescription>{profile.email}</CardDescription>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Badge>{profile.role}</Badge>
            <Badge variant="secondary">{profile.activeStatus}</Badge>
            <Badge variant={profile.isVerified ? 'default' : 'destructive'}>
              {profile.isVerified ? 'Verified' : 'Not Verified'}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your account information.</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-2">
          <InfoItem
            icon={<User className="h-5 w-5" />}
            label="Full Name"
            value={profile.name}
          />
          <InfoItem
            icon={<Mail className="h-5 w-5" />}
            label="Email Address"
            value={profile.email}
          />
          <InfoItem
            icon={<Phone className="h-5 w-5" />}
            label="Phone Number"
            value={profile.phone || 'Not provided'}
          />
          <InfoItem
            icon={<Shield className="h-5 w-5" />}
            label="Role"
            value={profile.role}
          />
          <InfoItem
            icon={<CalendarDays className="h-5 w-5" />}
            label="Member Since"
            value={new Date(profile.createdAt).toLocaleDateString()}
          />
          <InfoItem
            icon={<Clock3 className="h-5 w-5" />}
            label="Last Login"
            value={
              profile.lastLoginAt
                ? new Date(profile.lastLoginAt).toLocaleString()
                : 'N/A'
            }
          />
          <InfoItem
            icon={<Fingerprint className="h-5 w-5" />}
            label="Account ID"
            value={`${profile.id.slice(0, 10)}...`}
          />
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-4">
        <Button>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
        <Button variant="outline">
          <KeyRound className="mr-2 h-4 w-4" />
          Change Password
        </Button>
      </div>
    </div>
  );
}

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg border p-4">
      <div className="rounded-md bg-primary/10 p-2 text-primary">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 font-medium break-all">{value}</p>
      </div>
    </div>
  );
}
