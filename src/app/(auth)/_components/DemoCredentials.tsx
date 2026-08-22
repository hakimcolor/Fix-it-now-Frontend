"use client";

import { UseFormSetValue } from "react-hook-form";
import { Shield, UserCog, User } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
}

interface DemoCredentialsProps {
  setValue: UseFormSetValue<LoginFormData>;
}

const demoAccounts = [
  {
    role: "ADMIN",
    email: "ADMIN@example.com",
    password: "ADMIN",
    icon: Shield,
  },
  {
    role: "TECHNICIAN",
    email: "TECHNICIAN@example.com",
    password: "TECHNICIAN",
    icon: UserCog,
  },
  {
    role: "CUSTOMER",
    email: "CUSTOMER@example.com",
    password: "CUSTOMER",
    icon: User,
  },
];

export default function DemoCredentials({
  setValue,
}: DemoCredentialsProps) {
  const handleFill = (email: string, password: string) => {
    setValue("email", email);
    setValue("password", password);
  };

  return (
    <div className="rounded-xl border bg-muted/40 p-4">
      <h3 className="mb-1 text-center text-sm font-semibold">
        Demo Login Credentials
      </h3>

      <p className="text-muted-foreground mb-4 text-center text-xs">
        Click any account below to autofill the login form.
      </p>

      <div className="space-y-3">
        {demoAccounts.map((account) => {
          const Icon = account.icon;

          return (
            <button
              key={account.role}
              type="button"
              onClick={() =>
                handleFill(account.email, account.password)
              }
              className="hover:border-primary hover:bg-background flex w-full items-center justify-between rounded-lg border bg-background p-3 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary rounded-full p-2">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="text-left">
                  <p className="font-medium">
                    {account.role}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {account.email}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold">
                  {account.password}
                </p>
                <p className="text-primary text-xs">
                  Use
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}