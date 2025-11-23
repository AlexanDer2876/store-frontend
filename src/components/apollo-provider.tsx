/** @format */

"use client";

import { ReactNode } from "react";

import { apolloClient } from "../lib/apollo-client";
import { ApolloProvider } from "@apollo/client/react";

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
