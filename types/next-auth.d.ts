import { Role, Status } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    profilePic: string;
    email: string;
    user_role: Role;
    status: Status;
    telegramNumber: string;
  }

  interface Session {
    user: User;
  }
}
