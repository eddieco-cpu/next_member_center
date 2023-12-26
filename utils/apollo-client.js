import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { GRAPHQL_API } from "@utils/api";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: GRAPHQL_API,
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
