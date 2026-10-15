"use server"

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";

import {ActionResult} from "@/types";
import prisma from "@/lib/prisma";
// bcryptjs has no declaration file installed in this project.
// @ts-expect-error TS7016: bcryptjs is provided as JavaScript.
import bcrypt from "bcryptjs";
import { lucia } from "@/lib/auth";

const schemaSignIn = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export async function signIn(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {
  
    const validate = schemaSignIn.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validate.success) {

        return {
            error: validate.error.issues[0].message,
        };
    }

  const existingUser = await prisma .user.findFirst({
    where: {
      email: validate.data.email,
      role: "superadmin",
    },
  });

  if (!existingUser) {
    return {
      error: "User not found",
    };
  }
  
  const comparePassword = await bcrypt.compare(
    validate.data.password,
    existingUser.password,
  );

  if (!comparePassword) {
    return {
      error: "Invalid password",
    };
  }

   const session = await lucia.createSession(existingUser.id, {});
   const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
   )


  return redirect('/dashboard');
}