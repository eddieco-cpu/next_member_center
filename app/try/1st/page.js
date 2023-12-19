import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

import CookiesArrangeTest from "@components/CookiesArrangeTest";

export default async function Page() {
  //
  return (
    <main className="page_body">
      <Container className={` small`}>
        <PageTitle>測試頁 1</PageTitle>
        <h1>使用 client 組件 + api ，來接觸 cookies</h1>
        <CookiesArrangeTest />
      </Container>
      <PageDevName>try/1st</PageDevName>
    </main>
  );
}
