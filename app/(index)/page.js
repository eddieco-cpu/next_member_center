import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

export default function Home() {
  return (
    <main className={"page_body"}>
      <Container className={` small`}>
        <PageTitle>首頁</PageTitle>
      </Container>
      <PageDevName>Home</PageDevName>
    </main>
  );
}
