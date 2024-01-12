import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

export default function Page() {
  return (
    <main className="page_body">
      <Container className={` small`}>
        <PageTitle>用戶狀態</PageTitle>
      </Container>
      <PageDevName>user</PageDevName>
    </main>
  );
}
