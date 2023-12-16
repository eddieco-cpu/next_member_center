import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

export default function Page() {
  return (
    <main className="page_body">
      <Container className={` small`}>
        <PageTitle>退休力檢測</PageTitle>
      </Container>
      <PageDevName>retirement</PageDevName>
    </main>
  );
}
