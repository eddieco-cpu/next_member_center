import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";
import DataForm from "./components/DataForm";
import Form from "./components/Form";

import classes from "./page.module.scss";

export default function Page() {
  //
  return (
    <main className="page_body">
      <Container className={` small`}>
        <PageTitle>個人資料</PageTitle>
        <DataForm />
        <Form></Form>
      </Container>
      <PageDevName>user / profile</PageDevName>
    </main>
  );
}
