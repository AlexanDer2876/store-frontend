/** @format */
"use client";

import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// ✅ tu endpoint (env)
const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql";

// ✅ Link HTTP
const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  // Si tu backend usa cookies/sesión, dejalo:
  credentials: "include",
});

// ✅ Link para inyectar Bearer token
const authLink = setContext((_, { headers }) => {
  // OJO: poné aquí la key REAL donde guardás el token
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken") // <-- cambia si tu key es otra
      : null;

  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
