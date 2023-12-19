import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

export default async function Page() {
  //
  return (
    <main className="page_body">
      <Container className={` small`}>
        <PageTitle>測試頁 2</PageTitle>
        <h1>使用 middleware ，來接觸 cookies</h1>
      </Container>
      <PageDevName>try/2nd</PageDevName>
    </main>
  );
}
