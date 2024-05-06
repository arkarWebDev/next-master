import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await LoginSchema.parseAsync(credentials);

          const user = await db.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) {
            throw new Error("Email doesn't exists.");
          }

          const passwordMatch = await bcrypt.compare(password, user?.password!);

          if (!passwordMatch) {
            throw new Error("Invaild login credentials.");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
