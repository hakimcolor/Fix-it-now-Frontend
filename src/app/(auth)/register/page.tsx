


// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Eye, EyeOff, User, Wrench } from "lucide-react"

// import Container from "@/components/common/Layout"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// type Role = "CUSTOMER" | "TECHNICIAN"

// export default function Register() {
//   const [role, setRole] = useState<Role | null>(null)
//   const [showPassword, setShowPassword] = useState(false)



//   return (
//     <Container>
//       <div className="flex min-h-screen items-center justify-center py-10">
//         <Card className="w-full max-w-md shadow-lg">
//           {!role ? (
//             <>
//               <CardHeader className="text-center">
//                 <CardTitle className="text-2xl">
//                   Create Your Account
//                 </CardTitle>

//                 <CardDescription>
//                   Choose how you'd like to use the platform.
//                 </CardDescription>
//               </CardHeader>

//               <CardContent className="space-y-4">
//                 <button
//                   onClick={() => setRole("CUSTOMER")}
//                   className="hover:border-primary hover:bg-accent flex w-full items-center gap-4 rounded-xl border p-5 text-left transition-all"
//                 >
//                   <div className="bg-primary/10 text-primary rounded-full p-3">
//                     <User size={24} />
//                   </div>

//                   <div>
//                     <h3 className="font-semibold">Customer</h3>
//                     <p className="text-muted-foreground text-sm">
//                       Book and manage service requests.
//                     </p>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => setRole("TECHNICIAN")}
//                   className="hover:border-primary hover:bg-accent flex w-full items-center gap-4 rounded-xl border p-5 text-left transition-all"
//                 >
//                   <div className="bg-primary/10 text-primary rounded-full p-3">
//                     <Wrench size={24} />
//                   </div>

//                   <div>
//                     <h3 className="font-semibold">Technician</h3>
//                     <p className="text-muted-foreground text-sm">
//                       Accept service requests and earn money.
//                     </p>
//                   </div>
//                 </button>
//               </CardContent>

//               <CardFooter className="justify-center">
//                 <p className="text-muted-foreground text-sm">
//                   Already have an account?{" "}
//                   <Link
//                     href="/login"
//                     className="text-primary font-medium hover:underline"
//                   >
//                     Login
//                   </Link>
//                 </p>
//               </CardFooter>
//             </>
//           ) : (
//             <>
//               <CardHeader className="text-center">
//                 <CardTitle className="text-2xl">
//                   Create {role === "CUSTOMER" ? "Customer" : "Technician"} Account
//                 </CardTitle>

//                 <CardDescription>
//                   Fill in your information below.
//                 </CardDescription>
//               </CardHeader>

//               <CardContent>
//                 <form className="space-y-5">
//                   <div className="space-y-2">
//                     <Label>Name</Label>
//                     <Input placeholder="John Doe" />
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Email</Label>
//                     <Input
//                       type="email"
//                       placeholder="john@example.com"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Phone</Label>
//                     <Input placeholder="+8801700000000" />
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Profile Photo URL</Label>
//                     <Input placeholder="https://example.com/avatar.jpg" />
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Password</Label>

//                     <div className="relative">
//                       <Input
//                         type={showPassword ? "text" : "password"}
//                         className="pr-10"
//                       />

//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="icon"
//                         onClick={() =>
//                           setShowPassword(!showPassword)
//                         }
//                         className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
//                       >
//                         {showPassword ? (
//                           <EyeOff className="h-4 w-4" />
//                         ) : (
//                           <Eye className="h-4 w-4" />
//                         )}
//                       </Button>
//                     </div>
//                   </div>

//                   <input
//                     type="hidden"
//                     value={role}
//                     name="role"
//                   />

//                   <div className="flex gap-2">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       className="flex-1"
//                       onClick={() => setRole(null)}
//                     >
//                       Back
//                     </Button>

//                     <Button
//                       type="submit"
//                       className="flex-1"
//                     >
//                       Create Account
//                     </Button>
//                   </div>
//                 </form>
//               </CardContent>
//             </>
//           )}
//         </Card>
//       </div>
//     </Container>
//   )
// }
























"use client";

import { useState } from "react";

import RegisterForm from "../_components/RegisterForm";
import RoleSelector from "../_components/RoleSelector";
import Container from "@/components/common/Container";
import { Card } from "@/components/ui/card";

export type Role = "CUSTOMER" | "TECHNICIAN";

export default function RegisterPage() {
  const [role, setRole] = useState<Role | null>(null);

  return (
    <>

      <Container>
        <div className="flex min-h-screen items-center justify-center py-10">
          <Card className="w-full max-w-md shadow-lg">
            {!role ? (
              <RoleSelector onSelect={setRole} />
            ) : (
              <RegisterForm
                role={role}
                onBack={() => setRole(null)}
              />
            )}
          </Card>
        </div>
      </Container>
    </>
  );
}
