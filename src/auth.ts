import NextAuth from "next-auth";
import {prisma} from "@/lib/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth",
  }
});
