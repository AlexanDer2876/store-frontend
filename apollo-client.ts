/** @format */
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import possibleTypes from "@/graphql/generated/possibleTypes.json"; // si usaste introspection
import { getCookie } from "cookies-next";

// 🔗 Enlace principal al servidor GraphQL
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL + "/graphql", // ejemplo: http://localhost:4000/graphql
});

// 🔐 Middleware para enviar token si existe
const authLink = setContext((_, { headers }) => {
  const token = getCookie("accessToken");
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

// ⚠️ Manejo global de errores
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions }) => {
      console.error(`[GraphQL error]: Message: ${message}`, extensions);
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    possibleTypes, // ✅ usa esto si generaste introspection
  }),
  connectToDevTools: process.env.NODE_ENV === "development",
});

export default client;
