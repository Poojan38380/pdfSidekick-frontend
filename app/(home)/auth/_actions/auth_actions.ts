"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function addUser({
  username,
  password,
  firstName,
  lastName,
  email,
}: {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}) {
  if (!password || !username || !firstName || !lastName) {
    throw new Error("All the fields are required.");
  }

  try {
    const user = await prisma.user.findFirst({ where: { username } });
    if (user) {
      throw new Error("Username already exists.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const encodedUserName = username.split(" ").join("+");
    // const profilePicURL = `https://ui-avatars.com/api/?background=random&name=${encodedUserName}&bold=true`;
    const profilePicURL = `https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${encodedUserName}`;

    const CreatedUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        profilePic: profilePicURL,
        firstName,
        lastName,
        email,
      },
    });

    return { success: true, userId: CreatedUser.id };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in addUser server action: ", error.stack);
    }
    return {
      success: false,
      error: `Failed to create user : ${error}`,
    };
  }
}
