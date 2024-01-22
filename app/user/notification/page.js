import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

import NotificationWrapper from "../components/NotificationWrapper";

import classes from "./page.module.scss";

export default function Page() {
  return (
    <main className="page_body">
      <Container className={` small`}>
        <PageTitle>通知中心</PageTitle>
        <section className={classes.notification__wrapper}>
          <NotificationWrapper />
        </section>
      </Container>
      <PageDevName>user / notification</PageDevName>
    </main>
  );
}
