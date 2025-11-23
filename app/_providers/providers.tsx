/** @format */

"use client";

import { ReactNode, Suspense } from "react";

import { apolloClient } from "../../src/lib/apollo-client";
import { ApolloProvider } from "@apollo/client/react";
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Suspense fallback={<div>Cargando...</div>}>{children}</Suspense>
    </ApolloProvider>
  );
}
