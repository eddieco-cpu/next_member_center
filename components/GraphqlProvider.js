"use client";

import { ApolloProvider } from "@apollo/client";
import createApolloClient from "@utils/apollo-client";

const apolloClient = createApolloClient();

export default function GraphqlProvider({ children }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
