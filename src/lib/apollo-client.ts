/** @format */

"use client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql", // 👈 la URL de tu backend NestJS
    credentials: "include", // si usás cookies
  }),
  cache: new InMemoryCache(),
});
