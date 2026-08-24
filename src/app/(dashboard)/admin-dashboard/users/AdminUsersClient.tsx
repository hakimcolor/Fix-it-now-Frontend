'use client';

import { useState, useTransition, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Ban,
  ShieldOff,
  UserCheck,
  MoreHorizontal,
  Search,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { updateUserStatusByAdmin } from '../../_actions/updateUserStatusByAdmin';
import { IUser } from './page';

type ActiveStatus = 'ACTIVE' | 'BLOCKED' | 'BAN' | 'UNBAN';
type RoleFilter = 'ALL' | 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN';

const roleColors: Record<string, string> = {
  ADMIN: 'bg-rose-100 text-rose-700 border-rose-200',
  TECHNICIAN: 'bg-violet-100 text-violet-700 border-violet-200',
  CUSTOMER: 'bg-sky-100 text-sky-700 border-sky-200',
};

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  BLOCKED: 'bg-amber-100 text-amber-700 border-amber-200',
  BAN: 'bg-red-100 text-red-700 border-red-200',
  UNBAN: 'bg-gray-100 text-gray-600 border-gray-200',
};

const avatarGradients: Record<string, string> = {
  ADMIN: 'from-rose-500 to-orange-400',
  TECHNICIAN: 'from-violet-500 to-blue-500',
  CUSTOMER: 'from-teal-400 to-emerald-500',
};

export default function AdminUsersClient({ users }: { users: IUser[] }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('ALL');
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.phone ?? '').includes(q);
      return matchRole && matchSearch;
    });
  }, [users, search, roleFilter]);

  const handleStatus = (userId: string, status: ActiveStatus) => {
    startTransition(async () => {
      try {
        await updateUserStatusByAdmin(userId, status);
        toast.success(
          `User ${status === 'BAN' ? 'banned' : status === 'BLOCKED' ? 'blocked' : 'updated'} successfully.`
        );
        router.refresh();
      } catch {
        toast.error('Failed to update user status.');
      }
    });
  };

  const initials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Tabs
            value={roleFilter}
            onValueChange={(v) => setRoleFilter(v as RoleFilter)}
          >
            <TabsList>
              <TabsTrigger value="ALL">All</TabsTrigger>
              <TabsTrigger value="CUSTOMER">Customers</TabsTrigger>
              <TabsTrigger value="TECHNICIAN">Technicians</TabsTrigger>
              <TabsTrigger value="ADMIN">Admins</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name, email, phone…"
              className="pl-9 w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>User</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-13" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No users match your search.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((user) => (
                  <TableRow key={user.id} className="group">
                    {/* User */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback
                            className={`bg-linear-to-br ${avatarGradients[user.role] ?? 'from-gray-400 to-gray-600'} text-xs font-bold text-white`}
                          >
                            {initials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium leading-none">
                            {user.name}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {user.phone ?? '—'}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs ${roleColors[user.role] ?? ''}`}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs ${statusColors[user.activeStatus] ?? ''}`}
                      >
                        {user.activeStatus}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {user.isVerified ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-muted-foreground/40" />
                      )}
                    </TableCell>

                    <TableCell className="text-xs text-muted-foreground">
                      {user.lastLoginAt
                        ? new Date(user.lastLoginAt).toLocaleDateString()
                        : '—'}
                    </TableCell>

                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100"
                            disabled={isPending}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Actions
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          {user.activeStatus !== 'BAN' && (
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600"
                              onClick={() => handleStatus(user.id, 'BAN')}
                            >
                              <Ban className="mr-2 h-4 w-4" />
                              Ban user
                            </DropdownMenuItem>
                          )}

                          {user.activeStatus === 'BAN' && (
                            <DropdownMenuItem
                              onClick={() => handleStatus(user.id, 'ACTIVE')}
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              Unban user
                            </DropdownMenuItem>
                          )}

                          {user.activeStatus !== 'BLOCKED' && (
                            <DropdownMenuItem
                              className="text-amber-600 focus:text-amber-600"
                              onClick={() => handleStatus(user.id, 'BLOCKED')}
                            >
                              <ShieldOff className="mr-2 h-4 w-4" />
                              Block user
                            </DropdownMenuItem>
                          )}

                          {user.activeStatus === 'BLOCKED' && (
                            <DropdownMenuItem
                              onClick={() => handleStatus(user.id, 'ACTIVE')}
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              Unblock user
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <p className="text-xs text-muted-foreground">
          Showing {filtered.length} of {users.length} users
        </p>
      </CardContent>
    </Card>
  );
}
