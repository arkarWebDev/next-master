"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";

import {
  LoginSchema,
  PostSchema,
  RegisterSchema,
  TopicSchema,
  DiscussSchema,
} from "@/schema";
import { auth, signIn, signOut } from "./auth";
import { db } from "@/db";
import { redirect } from "next/navigation";
import paths from "@/lib/paths";
import { Post, Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";

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

  let topic: Topic;

  try {
    topic = await db.topic.create({
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

  revalidatePath("/");

  redirect(paths.SingleTopic(topic.id));
};

export const createPostHandler = async (data: z.infer<typeof PostSchema>) => {
  const session = await auth();
  const validateData = await PostSchema.parseAsync(data);

  const { title, content, topicId } = validateData;

  if (!session?.user) {
    throw new Error("Invaild login credentials");
  }

  let post: Post;

  try {
    post = await db.post.create({
      data: {
        title,
        content,
        topicId,
        userId: session.user.id as string,
      },
    });
  } catch (error) {
    console.log(error);

    throw new Error("Something went wrong.");
  }

  revalidatePath("/");

  redirect(paths.SinglePost(topicId, post.id));
};

export const createCommentHandler = async (
  data: z.infer<typeof DiscussSchema>
) => {
  const session = await auth();
  const validateData = await DiscussSchema.parseAsync(data);

  const { message, postId, topicName } = validateData;

  if (!session?.user) {
    throw new Error("Invaild login credentials");
  }

  try {
    await db.comment.create({
      data: {
        content: message,
        userId: session.user.id as string,
        postId,
      },
    });
  } catch (error) {
    console.log(error);

    throw new Error("Something went wrong.");
  }

  revalidatePath(paths.SinglePost(topicName, postId));

  revalidatePath(paths.SinglePost(topicName, postId));
};
