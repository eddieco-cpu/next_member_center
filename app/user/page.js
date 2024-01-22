import Image from "next/image";
import Link from "next/link";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

import NotificationWrapper from "./components/NotificationWrapper";
import UserNav from "./components/UserNav";

import classes from "./page.module.scss";

export default function Page() {
  return (
    <main className="page_body">
      <Container className={` small`}>
        <PageTitle>用戶狀態</PageTitle>
        <section className={classes.user__wrapper}>
          <h2 className={classes.user__greeting}>您好！ 歡迎光臨元氣網</h2>
          <h3 className={classes.user__title}>
            <i className="i-notification"></i>
            最新消息
          </h3>
          <NotificationWrapper />
          <Link className={classes.showmore} href="/user/notification">
            查看全部通知
          </Link>
          <UserNav />
        </section>
      </Container>
      <PageDevName>user</PageDevName>
    </main>
  );
}
