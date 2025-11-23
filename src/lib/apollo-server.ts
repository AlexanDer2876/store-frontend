/** @format */

// /** @format */

// // src/lib/apollo-server.ts
// import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
// import fetch from "cross-fetch";

// export const apolloServerClient = new ApolloClient({
//   link: new HttpLink({
//     uri: process.env.GRAPHQL_URL ?? "http://localhost:4000/graphql",
//     fetch,
//   }),
//   cache: new InMemoryCache(),
//   ssrMode: true,
// });
// src/lib/apollo-server.ts
// src/lib/apollo-server.ts (server-only)
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import fetch from "cross-fetch";

export const apolloServerClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GRAPHQL_URL ?? "http://localhost:4000/graphql",
    fetch,
  }),
  cache: new InMemoryCache(),
  ssrMode: true,
});
