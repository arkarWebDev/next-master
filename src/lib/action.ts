"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { LoginSchema, RegisterSchema, TopicSchema } from "@/schema";
import { auth, signIn, signOut } from "./auth";
import { db } from "@/db";
import { redirect } from "next/navigation";
import paths from "@/lib/paths";

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

export const createTopicHandler = async (
  formData: z.infer<typeof TopicSchema>
) => {
  const session = await auth();
  const validateData = await TopicSchema.parseAsync(formData);

  const { name, image, description } = validateData;

  if (!session?.user) {
    throw new Error("Invaild login credentials");
  }

  try {
    await db.topic.create({
      data: {
        name,
        image,
        description,
        creator: session.user.name as string,
      },
    });
  } catch (error) {
    console.log(error);

    throw new Error("Something went wrong.");
  }

  redirect(paths.SingleTopic(name));
};
