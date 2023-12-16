import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

export default function Page() {
  return (
    <main className="page_body">
      <Container className={` small`}>
        <PageTitle>我的課程</PageTitle>
      </Container>
      <PageDevName>order / course</PageDevName>
    </main>
  );
}
