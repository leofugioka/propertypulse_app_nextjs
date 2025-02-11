import NextAuth from "next-auth";
import { prisma } from "@/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import * as queries from "@/queries";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      // Access with OAuth
      if (account?.provider !== "credentials") return true;

      if (!user.id) return false;
      // check if user exists
      const existingUser = await queries.getUserById(user.id);
      // if not, create user
      if (!existingUser) {
        return false;
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await queries.getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await queries.getAccountByUserID(existingUser.id);

      token.isOauth = !!existingAccount;
      token.name = existingUser.name;

      return token;
    },
    // Session callback that modifies the session object
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isOauth: token.isOauth,
        },
      };
    },
  },
});
