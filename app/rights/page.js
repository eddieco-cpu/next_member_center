import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

import classes from "./page.module.scss";

export default function Page() {
  return (
    <main className="page_body">
      <Container className={`${classes.rights_container} small`}>
        <PageTitle>注意事項</PageTitle>
      </Container>
      <PageDevName>rights</PageDevName>
    </main>
  );
}
