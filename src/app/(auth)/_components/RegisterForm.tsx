"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  RegisterFormData,
  registerSchema,
} from "@/schemas/register.schema";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { registerUser } from "../_actions/registerUser";

type Role = "CUSTOMER" | "TECHNICIAN";

interface RegisterFormProps {
  role: Role;
  onBack: () => void;
}

export default function RegisterForm({
  role,
  onBack,
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);

const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      profilePhoto: "",
      password: "",
      role,
    },
  });


const onSubmit = async (data: RegisterFormData) => {
  try {
    const result = await registerUser(data);

    // console.log(result);

    toast.success("Registration successful!", {
      description: "Redirecting to the login page...",
    });

    setTimeout(() => {
      router.push("/login");
    }, 1200);
  } catch (error) {
    console.error(error);

    toast.error("Registration failed", {
      description:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
    });
  }
};

  return (
    <>

      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          Create{" "}
          {role === "CUSTOMER" ? "Customer" : "Technician"} Account
        </CardTitle>

        <CardDescription>
          Fill in your information below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="John Doe"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="john@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              placeholder="+8801700000000"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Profile Photo URL</Label>
            <Input
              placeholder="https://example.com/avatar.jpg"
              {...register("profilePhoto")}
            />
            {errors.profilePhoto && (
              <p className="text-sm text-red-500">
                {errors.profilePhoto.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Password</Label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                className="pr-10"
                {...register("password")}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <input
            type="hidden"
            {...register("role")}
          />

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              // onClick={() => setRole(null)}
              onClick={onBack}
            >
              Back
            </Button>

            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </Button>
          </div>
        </form>
      </CardContent>

    </>
  );
}