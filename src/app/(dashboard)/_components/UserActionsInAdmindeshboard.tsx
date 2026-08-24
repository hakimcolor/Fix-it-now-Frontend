// import React from 'react'

// export default function UserActionsInAdmindeshboard() {
//   return (
//     <div>UserActionsInAdmindeshboard</div>
//   )
// }

// "use client";

// import { MoreHorizontal, Ban, UserCheck, Trash2 } from "lucide-react";

// import { Button } from "@/components/ui/button";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// interface IActiveStatus {
//     ACTIVE: "ACTIVE",
//     BLOCKED: "BLOCKED",
//     BAN: "BAN",
//     UNBAN: "UNBAN",
// }

// interface UserActionsProps {
//   userId: string;
//   activeStatus: IActiveStatus;
// }

// export default function UserActionsInAdmindeshboard({
//   userId,
//   activeStatus,
// }: UserActionsProps) {
//   const handleBan = () => {
//     console.log("Ban:", userId);
//   };

//   const handleUnban = () => {
//     console.log("Unban:", userId);
//   };

//   const handleDelete = () => {
//     console.log("Delete:", userId);
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon">
//           <MoreHorizontal className="h-4 w-4" />
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent align="end">
//         {activeStatus === "ACTIVE" ? (
//           <DropdownMenuItem onClick={handleBan}>
//             <Ban className="mr-2 h-4 w-4" />
//             Ban
//           </DropdownMenuItem>
//         ) : (
//           <DropdownMenuItem onClick={handleUnban}>
//             <UserCheck className="mr-2 h-4 w-4" />
//             Unban
//           </DropdownMenuItem>
//         )}

//         <DropdownMenuItem
//           onClick={handleDelete}
//           className="text-destructive focus:text-destructive"
//         >
//           <Trash2 className="mr-2 h-4 w-4" />
//           Delete
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// "use client";

// import {
//   Ban,
//   MoreHorizontal,
//   ShieldOff,
//   Trash2,
//   UserCheck,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// export type ActiveStatus = "ACTIVE" | "BLOCKED" | "BAN" | "UNBAN";

// interface UserActionsProps {
//   userId: string;
//   activeStatus: ActiveStatus;
// }

// export default function UserActionsInAdminDashboard({
//   userId,
//   activeStatus,
// }: UserActionsProps) {
//   const handleBan = () => {
//     console.log("Ban:", userId);
//   };

//   const handleUnban = () => {
//     console.log("Unban:", userId);
//   };

//   const handleBlock = () => {
//     console.log("Block:", userId);
//   };

//   const handleDelete = () => {
//     console.log("Delete:", userId);
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon">
//           <MoreHorizontal className="h-4 w-4" />
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent align="end">
//         {activeStatus !== "BAN" && (
//           <DropdownMenuItem onClick={handleBan}>
//             <Ban className="mr-2 h-4 w-4" />
//             Ban
//           </DropdownMenuItem>
//         )}

//         {activeStatus === "BAN" && (
//           <DropdownMenuItem onClick={handleUnban}>
//             <UserCheck className="mr-2 h-4 w-4" />
//             Unban
//           </DropdownMenuItem>
//         )}

//         {activeStatus !== "BLOCKED" && (
//           <DropdownMenuItem onClick={handleBlock}>
//             <ShieldOff className="mr-2 h-4 w-4" />
//             Block
//           </DropdownMenuItem>
//         )}

//         <DropdownMenuItem
//           onClick={handleDelete}
//           className="text-destructive focus:text-destructive"
//         >
//           <Trash2 className="mr-2 h-4 w-4" />
//           Delete
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Ban, MoreHorizontal, ShieldOff, UserCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { updateUserStatusByAdmin } from '../_actions/updateUserStatusByAdmin';
import { toast } from 'sonner';

export type ActiveStatus = 'ACTIVE' | 'BLOCKED' | 'BAN' | 'UNBAN';

interface UserActionsProps {
  userId: string;
  activeStatus: ActiveStatus;
}

export default function UserActionsInAdminDashboard({
  userId,
  activeStatus,
}: UserActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleStatusUpdate = (status: ActiveStatus) => {
    startTransition(async () => {
      try {
        const result = await updateUserStatusByAdmin(userId, status);
        if (result.success) {
          toast.success(`User status updated to ${status}`);
          router.refresh();
        } else {
          toast.error(result.message ?? 'Failed to update user status');
        }
      } catch {
        toast.error('Failed to update user status');
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {activeStatus !== 'BAN' && (
          <DropdownMenuItem onClick={() => handleStatusUpdate('BAN')}>
            <Ban className="mr-2 h-4 w-4" />
            Ban
          </DropdownMenuItem>
        )}

        {activeStatus === 'BAN' && (
          <DropdownMenuItem onClick={() => handleStatusUpdate('ACTIVE')}>
            <UserCheck className="mr-2 h-4 w-4" />
            Unban
          </DropdownMenuItem>
        )}

        {activeStatus !== 'BLOCKED' && (
          <DropdownMenuItem onClick={() => handleStatusUpdate('BLOCKED')}>
            <ShieldOff className="mr-2 h-4 w-4" />
            Block
          </DropdownMenuItem>
        )}

        {activeStatus === 'BLOCKED' && (
          <DropdownMenuItem onClick={() => handleStatusUpdate('ACTIVE')}>
            <UserCheck className="mr-2 h-4 w-4" />
            Unblock
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
