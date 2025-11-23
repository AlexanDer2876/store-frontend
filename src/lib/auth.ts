/** @format */

// /** @format */

// // src/lib/auth.ts (SERVER, sin "use client")
// import type { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { apolloServerClient } from "./apollo-server"; // tu cliente de SERVER
// import { gql } from "@apollo/client/core";

// // (ejemplo) query opcional al backend
// const MeDocument = gql`
//   query Me {
//     me {
//       id
//       email
//       name
//     }
//   }
// `;

// export const authOptions: NextAuthOptions = {
//   session: { strategy: "jwt" },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: { email: {}, password: {} },
//       async authorize(credentials) {
//         // ejemplo mínimo: pide a tu backend o valida acá
//         const { data } = await apolloServerClient.query({ query: MeDocument });
//         return data?.me ?? null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.user = user;
//       return token;
//     },
//     async session({ session, token }) {
//       // @ts-expect-error
//       if (token?.user) session.user = token.user;
//       return session;
//     },
//   },
// };
// src/lib/auth.ts
// src/lib/auth.ts
// src/lib/auth.ts
// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from "@apollo/client/core";
import fetch from "cross-fetch";

const apolloServerClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GRAPHQL_URL ?? "http://localhost:4000/graphql",
    fetch,
  }),
  cache: new InMemoryCache(),
  ssrMode: true,
});

// IMPORTANTe: tu schema expone "signIn(input: SignInInput!)"
const SIGN_IN_MUTATION = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      accessToken
      user {
        id
        name
        email
        roles
      }
    }
  }
`;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const { data, errors } = await apolloServerClient.mutate({
            mutation: SIGN_IN_MUTATION,
            variables: {
              input: {
                email: credentials.email,
                password: credentials.password,
              },
            },
            errorPolicy: "all",
          });

          // (opcional) logs de depuración:
          // console.log("[authorize] GQL errors:", errors);
          // console.log("[authorize] GQL data:", JSON.stringify(data, null, 2));

          const payload = data?.signIn;
          if (!payload?.user || !payload?.accessToken) return null;

          return {
            id: payload.user.id,
            name: payload.user.name,
            email: payload.user.email,
            accessToken: payload.accessToken,
          };
        } catch (e) {
          // console.error("[authorize] GraphQL exception:", e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = { id: user.id, name: user.name, email: user.email };

        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user ?? session.user;

      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: { signIn: "/sign-in" },
};
