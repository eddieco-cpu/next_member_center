import Link from "next/link";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

export default function NotFound() {
  return (
    <main className="page_body">
      <Container className={` small`}>
        <PageTitle>404</PageTitle>
      </Container>
      <PageDevName>404</PageDevName>
    </main>
  );
}
