import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

export default function Page({ params: { pageId } }) {
  return (
    <main className="page_body">
       <Container className={` small`}>
        <PageTitle>文章收藏</PageTitle>
        <h1>文章收藏： 第 <b>{pageId}</b> 頁 </h1>
      </Container>
      <PageDevName>collection / {pageId}</PageDevName>
    </main>
  );
}
