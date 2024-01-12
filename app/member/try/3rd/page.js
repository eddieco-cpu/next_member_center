import Image from "next/image";
import { cookies } from "next/headers";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

export default async function Page() {
  //
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();
  console.log("all cookies in server component: ", allCookies);

  return (
    <main className="page_body">
      <Container className={` small`}>
        <PageTitle>測試頁 3</PageTitle>
        <h1>使用 server 組件，來接觸 cookies</h1>
      </Container>
      <PageDevName>try/3rd</PageDevName>
    </main>
  );
}
