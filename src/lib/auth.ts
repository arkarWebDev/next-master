import NextAuth from "next-auth";
import { db } from "@/db";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schema";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
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
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github") {
        const existingUser = await db.user.findUnique({
          where: { email: profile?.email! },
        });

        if (!existingUser) {
          await db.user.create({
            data: {
              name: profile?.login as string,
              email: profile?.email as string,
              image: profile?.avatar_url as string,
            },
          });
        }
      }

      return true;
    },
  },
});
