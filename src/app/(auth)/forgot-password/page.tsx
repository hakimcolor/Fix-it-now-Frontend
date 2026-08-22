"use client"

import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"

import Container from "@/components/common/Container"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPassword() {
  return (
    <Container>
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>

            <CardTitle className="text-2xl font-bold">
              Forgot Password?
            </CardTitle>

            <CardDescription>
              Enter your email address and we'll send you a password reset link.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  autoComplete="email"
                  required
                  className="focus-visible:ring-ring"
                />
              </div>

              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center">
            <Button asChild variant="link">
              <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Container>
  )
}