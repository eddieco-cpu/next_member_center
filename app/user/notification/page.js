import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

export default function Page() {
  return (
    <main className="page_body">
      <Container className={` small`}>
        <PageTitle>通知中心</PageTitle>
      </Container>
      <PageDevName>user / notification</PageDevName>
    </main>
  );
}
