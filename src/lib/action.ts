"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { LoginSchema, RegisterSchema } from "@/schema";
import { signIn, signOut } from "./auth";
import { db } from "@/db";
import { redirect } from "next/navigation";

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};

export const registerHandler = async (data: z.infer<typeof RegisterSchema>) => {
  const validateData = await RegisterSchema.parseAsync(data);

  const { name, email, password } = validateData;

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  redirect("/");
};

export const loginHandler = async (data: z.infer<typeof LoginSchema>) => {
  await signIn("credentials", data);
};
