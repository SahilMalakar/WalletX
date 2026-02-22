import { prisma } from "@repo/database";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const _nextAuth = NextAuth({
  providers: [
    Credentials({
      credentials: {
        phoneNumber: {
          label: "Phone Number",
          type: "text",
          placeholder: "+91XXXXXXXXXX",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        console.log("Incoming credentials:", credentials);

        if (
          typeof credentials?.phoneNumber !== "string" ||
          typeof credentials?.password !== "string"
        ) {
          console.log("Invalid credential types");
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: { phoneNumber: credentials.phoneNumber },
        });

        console.log("User found:", existingUser);

        if (!existingUser) {
          console.log("User not found");
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          existingUser.password,
        );

        console.log("Password valid:", isValid);

        if (!isValid) {
          console.log("Password mismatch");
          return null;
        }

        console.log("Login success");

        return {
          id: String(existingUser.id),
          name: existingUser.name,
          email: existingUser.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = String((user as any).id);
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = String(token.id);
      }
      return session;
    },
  },
});

export const handlers = (_nextAuth as any).handlers;
export const signIn = (_nextAuth as any).signIn;
export const signOut = (_nextAuth as any).signOut;
export const auth = (_nextAuth as any).auth;
