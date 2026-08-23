'use client';

import { useState } from 'react';
import { Wrench } from 'lucide-react';
import RegisterForm from '../_components/RegisterForm';
import RoleSelector from '../_components/RoleSelector';

export type Role = 'CUSTOMER' | 'TECHNICIAN';

export default function RegisterPage() {
  const [role, setRole] = useState<Role | null>(null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
            <Wrench className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {role
              ? `${role === 'CUSTOMER' ? 'Customer' : 'Technician'} Account`
              : 'Join FixItNow'}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {role
              ? 'Fill in your details to get started'
              : 'Choose your role to create an account'}
          </p>
        </div>

        {!role ? (
          <RoleSelector onSelect={setRole} />
        ) : (
          <RegisterForm role={role} onBack={() => setRole(null)} />
        )}
      </div>
    </div>
  );
}
