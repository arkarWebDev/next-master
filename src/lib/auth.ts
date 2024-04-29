import NextAuth from "next-auth";
import { db } from "@/db";
import Github from "next-auth/providers/github";

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
