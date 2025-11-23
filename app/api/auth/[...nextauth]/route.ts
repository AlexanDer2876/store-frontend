/** @format */

// src/app/api/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "../../../../src/lib/auth"; // o "@/lib/auth" si tienes alias

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
