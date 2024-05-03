"use server";

import { db } from "@/db";
import bcrypt from "bcryptjs";

export const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return user ? true : false;
};

export const validateLoginData = async (email: string, password: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      console.log("Invaild login credentials.");
      return false;
    }

    const passwordMatch = await bcrypt.compare(password, user?.password!);

    if (!passwordMatch) {
      console.log("Invaild login credentials.");
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
