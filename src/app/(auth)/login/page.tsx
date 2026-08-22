// "use client";

// import {  useState } from "react";
// import Link from "next/link";
// import { Eye, EyeOff } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";
// import Container from "@/components/common/Container";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { loginUser } from "../_actions/loginUser";
// import { loginSchema, LoginFormData } from "@/schemas/login.schema";

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });
//   const onSubmit = async (data: LoginFormData) => {
//     try {
//       const result = await loginUser(data);
//       toast.success("Login successful", {
//         description: result.message || "Welcome back!",
//       });
//     } catch (error) {
//       const message =
//         error instanceof Error
//           ? error.message
//           : "Invalid email or password";

//       toast.error("Login failed", {
//         description: message,
//       });
//     }
//   };

//   return (
//     <Container>
//       <div className="flex min-h-screen items-center justify-center">
//         <Card className="w-full max-w-sm shadow-lg">
//           <CardHeader className="space-y-2 text-center">
//             <CardTitle className="text-primary text-2xl font-bold">
//               Welcome Back
//             </CardTitle>
//             <CardDescription>
//               Login to your account to continue.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="space-y-5"
//             >
//               {/* Email */}
//               <div className="space-y-2">
//                 <Label htmlFor="email">
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="john@example.com"
//                   autoComplete="email"
//                   {...register("email")}
//                 />
//                 {errors.email && (
//                   <p className="text-sm text-red-500">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>
//               {/* Password */}
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="password">
//                     Password
//                   </Label>
//                   <Link
//                     href="/reset-password"
//                     className="text-primary text-sm hover:underline"
//                   >
//                     Forgot password?
//                   </Link>
//                 </div>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     type={
//                       showPassword
//                         ? "text"
//                         : "password"
//                     }
//                     placeholder="••••••••"
//                     autoComplete="current-password"
//                     {...register("password")}
//                     className="pr-11"
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     aria-label="Toggle password visibility"
//                     onClick={() =>
//                       setShowPassword(
//                         (prev) => !prev
//                       )
//                     }
//                     className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 hover:bg-transparent"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="text-muted-foreground h-4 w-4" />
//                     ) : (
//                       <Eye className="text-muted-foreground h-4 w-4" />
//                     )}
//                   </Button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-sm text-red-500">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>
//               {/* Submit Button */}
//               <Button
//                 type="submit"
//                 className="w-full"
//                 disabled={isSubmitting}
//               >

//                 {isSubmitting
//                   ? "Logging in..."
//                   : "Login"}
//               </Button>
//             </form>
//           </CardContent>
//           <CardFooter className="justify-center">
//             <p className="text-muted-foreground text-sm">
//               Don&apos;t have an account?{" "}
//               <Link
//                 href="/register"
//                 className="text-primary font-medium hover:underline"
//               >
//                 Sign Up
//               </Link>
//             </p>
//           </CardFooter>
//         </Card>
//       </div>
//     </Container>
//   );
// }









































"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "../_actions/loginUser";
import { loginSchema, LoginFormData } from "@/schemas/login.schema";
import DemoCredentials from "../_components/DemoCredentials";
import { GoogleLoginButton } from "../_components/GoogleLoginButton";
// import GoogleLoginButton from "../_components/GoogleLoginButton";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  // const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginUser(data);
      toast.success("Login successful", {
        description: result.message || "Welcome back!",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Invalid email or password";

      toast.error("Login failed", {
        description: message,
      });
    }
  };

  return (
    <Container>
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-primary text-2xl font-bold">
              Welcome Back
            </CardTitle>
            <CardDescription>
              Login to your account to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  autoComplete="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">
                    Password
                  </Label>
                  <Link
                    href="/reset-password"
                    className="text-primary text-sm hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...register("password")}
                    className="pr-11"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Toggle password visibility"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 hover:bg-transparent"
                  >
                    {showPassword ? (
                      <EyeOff className="text-muted-foreground h-4 w-4" />
                    ) : (
                      <Eye className="text-muted-foreground h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >

                {isSubmitting
                  ? "Logging in..."
                  : "Login"}
              </Button>

              {/* Google Login component */}
              <div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>

                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google Login */}
                <div className="w-full">
                  <GoogleLoginButton />
                </div>
              </div>
              <DemoCredentials setValue={setValue} />
            </form>

          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-muted-foreground text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
}