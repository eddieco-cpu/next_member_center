import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

import Wrapper from "./components/Wrapper";

export default function Page() {
  return (
    <main className="page_body">
      <Container className={` small`}>
        <PageTitle>訂單明細</PageTitle>
        <Wrapper />
      </Container>
      <PageDevName>order</PageDevName>
    </main>
  );
}
