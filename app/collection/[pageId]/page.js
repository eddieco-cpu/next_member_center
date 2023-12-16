import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

export default function Page({ params: { pageId } }) {
  return (
    <main className="page_body">
       <Container className={` small`}>
        <PageTitle>文章收藏</PageTitle>
      </Container>
      <PageDevName>collection / {pageId}</PageDevName>
    </main>
  );
}
