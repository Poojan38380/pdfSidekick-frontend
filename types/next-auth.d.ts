
declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    profilePic: string;
    email: string;
  }

  interface Session {
    user: User;
  }
}
