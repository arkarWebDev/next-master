import * as z from "zod";
import { checkEmailExists, validateLoginData } from "./utils";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "Please enter your name first.",
    }),
    email: z
      .string()
      .email({
        message: "Please enter a vaild email address.",
      })
      .refine(
        async (email) => {
          const emailExists = await checkEmailExists(email);

          if (emailExists) {
            return false;
          }

          return true;
        },
        {
          message: "Email already exists in record.",
        }
      ),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match.",
    path: ["confirmPassword"],
  });

export const LoginSchema = z
  .object({
    email: z
      .string()
      .email({
        message: "Please enter a vaild email address.",
      })
      .refine(
        async (email) => {
          const emailExists = await checkEmailExists(email);

          if (emailExists) {
            return true;
          }

          return false;
        },
        {
          message: "Email doesn't exists.",
        }
      ),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long.",
    }),
  })
  .refine(
    async (data) => {
      const isMatch = await validateLoginData(data.email, data.password);

      if (isMatch) {
        return true;
      }

      return false;
    },
    {
      message: "Invaild login credentials.",
      path: ["password"],
    }
  );

export const TopicSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Topic name must be at least 3 characters long.",
    })
    .refine((value) => !/\s/.test(value), {
      message: "Topic name must not contain spaces.",
    }),
  image: z
    .string()
    .regex(/^https:\/\//, 'The URL must start with "https://"')
    .url({ message: "Invalid URL" })
    .refine((value) => /\.(jpg|jpeg|png|gif)$/i.test(value), {
      message:
        "The URL must be a link to an image file (.jpg, .jpeg, .png, .gif)",
    }),
  description: z.string().min(20, {
    message: "Topic description must be at least 20 characters long.",
  }),
});

export const PostSchema = z.object({
  title: z.string().min(3, {
    message: "Post title must be at least 3 characters long.",
  }),
  content: z.string().min(20, {
    message: "Post content must be at least 20 characters long.",
  }),
  topicId: z.string(),
});

export const DiscussSchema = z.object({
  message: z.string().min(3, {
    message: "Discuss content must be at least 3 characters long.",
  }),
  postId: z.string(),
  topicName: z.string(),
});
