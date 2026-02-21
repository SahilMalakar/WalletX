import { prisma } from "@repo/database";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
          id: existingUser.id,
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
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
