import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";
import ForgotProcessor from "./components/ForgotProcessor";

import classes from "./page.module.scss";

export default function Page() {
  return (
    <main className="page_body">
      <Container className={` small`}>
        <PageTitle>忘記/修改密碼</PageTitle>
        <section className={classes.forgot__wrapper}>
          <span className={classes.forgot__span}>
            輸入E-MAIL後系統將送【重設密碼通知】，或是輸入手機碼取得一次性【簡訊認證碼】若複收到多封通知函，最新一封為主；若沒收到，建議至垃圾郵件夾查看。
          </span>
          <ForgotProcessor />
        </section>
      </Container>
      <PageDevName>forgot</PageDevName>
    </main>
  );
}
