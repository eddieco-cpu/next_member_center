import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";
import Form from "./components/Form";

export default function Page() {
  return (
    <main className="page_body">
      <Container className={` small`}>
        <PageTitle>個人資料</PageTitle>
        <Form />
      </Container>
      <PageDevName>user / profile</PageDevName>
    </main>
  );
}
