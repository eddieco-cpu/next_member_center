import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

export default function PageLayout({ children }) {
  //
  return (
    <main className="page_body">
      <Container className={` small`}>
        <PageTitle>文章收藏</PageTitle>
        {children}
      </Container>
      <PageDevName>collection</PageDevName>
    </main>
  );
}
