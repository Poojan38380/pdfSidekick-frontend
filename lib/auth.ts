import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import prisma from "./prisma";

export interface CustomUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePic: string;
  email: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing username or password");
        }

        const username = credentials.username as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: { username },
        });

        if (!user) {
          throw new Error("User not found");
        }

        try {
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
        } catch (error) {
          console.error("Password validation error:", error);
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          username: user.username,
          profilePic: user.profilePic,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],
  callbacks: {
    // @ts-expect-error: TypeScript may not correctly infer the shape of the `token` and `user` objects in NextAuth's `jwt` callback.
    async jwt({ token, user }: { token: JWT; user?: CustomUser }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.profilePic = user.profilePic;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    // @ts-expect-error: TypeScript might not infer the structure of `session.user` as expected in the `session` callback.
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      session.user.profilePic = token.profilePic as string;
      session.user.email = token.email as string;
      session.user.firstName = token.firstName as string;
      session.user.lastName = token.lastName as string;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
