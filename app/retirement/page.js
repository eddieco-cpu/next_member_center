"use client";

import Image from "next/image";

import { ApolloProvider } from "@apollo/client";
import createApolloClient from "@utils/apollo-client";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

import GraphQLsTest from "@/components/GraphQLsTest";

const apolloClient = createApolloClient();

export default function Page() {
  return (
    <main className="page_body">
      <Container className={` small`}>
        <ApolloProvider client={apolloClient}>
          <PageTitle>退休力檢測</PageTitle>
          <GraphQLsTest></GraphQLsTest>
        </ApolloProvider>
      </Container>
      <PageDevName>retirement</PageDevName>
    </main>
  );
}
