"use client"

import { cn } from "@/lib/utils"
import {  useFormStatus } from "react-dom"
import { useActionState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import React from "react";
import { signIn } from "../lib/actions";
import { ActionResult } from "@/types";
import { AlertCircleIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const initialState: ActionResult = {
	error: "",
};

function SubmitButton() {
  const {pending} = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Loading..." : "Login"}
    </Button>
  )
}


export function FormSignIn({
  className,
  ...props
}: React.ComponentProps<"div">) {
   
const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                  {state.error!=="" && (
                    <Alert variant="destructive" className="max-w-md">
                    <AlertTitle>Error</AlertTitle>
                   <AlertDescription>
                      Email/Paaword Incorrect.
                    </AlertDescription>
                </Alert>
                  )}
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Loading..." : "Login"}
                </Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
