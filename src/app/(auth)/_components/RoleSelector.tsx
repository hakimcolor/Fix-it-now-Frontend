
import Link from "next/link";
import { User, Wrench } from "lucide-react";

import {

  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type Role = "CUSTOMER" | "TECHNICIAN";

interface Props {
  onSelect: (role: Role) => void;
}

export default function RoleSelector({ onSelect }: Props) {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          Create Your Account
        </CardTitle>

        <CardDescription>
          Choose how you'd like to use the platform.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <button
          type="button"
          onClick={() => onSelect("CUSTOMER")}
          // onClick={() => handleRoleSelect("CUSTOMER")}
          className="hover:border-primary hover:bg-accent flex w-full items-center gap-4 rounded-xl border p-5 text-left transition-all"
        >
          <div className="bg-primary/10 text-primary rounded-full p-3">
            <User size={24} />
          </div>

          <div>
            <h3 className="font-semibold">Customer</h3>
            <p className="text-muted-foreground text-sm">
              Book and manage service requests.
            </p>
          </div>
        </button>

        <button
          type="button"
          // onClick={() => handleRoleSelect("TECHNICIAN")}
          onClick={() => onSelect("TECHNICIAN")}
          className="hover:border-primary hover:bg-accent flex w-full items-center gap-4 rounded-xl border p-5 text-left transition-all"
        >
          <div className="bg-primary/10 text-primary rounded-full p-3">
            <Wrench size={24} />
          </div>

          <div>
            <h3 className="font-semibold">Technician</h3>
            <p className="text-muted-foreground text-sm">
              Accept service requests and earn money.
            </p>
          </div>
        </button>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </>
  );
}