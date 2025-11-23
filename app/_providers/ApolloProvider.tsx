/** @format */

"use client";

import ApolloProvider from "../../components/apollo-provider";
import { apolloClient } from "../../src/lib/apollo-client";
import { ReactNode } from "react";

export default function ApolloClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
