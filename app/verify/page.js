import Image from "next/image";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

import classes from "./page.module.scss";

import ForgotMobile from "./components/ForgotMobile";

export default function Page({ searchParams: { type = "resend" } }) {
  //
  let title = "";
  let child = null;

  switch (type) {
    case "bind":
      title = "第三方登入註冊";
      child = null; //renderComponent(Bind);
      break;
    case "email":
      title = "電子信箱認證";
      child = null; //renderComponent(EmailVerify);
      break;
    case "sms":
      title = "手機簡訊認證";
      child = null; //renderComponent(SMS);
      break;
    case "forgotMobile":
      title = "重設密碼";
      child = <ForgotMobile />;
      break;
    case "resend":
      title = "重寄啟用信";
      child = null; //renderComponent(EmailResend);
      break;
    default:
      break;
  }
  //
  return (
    <main className="page_body">
      <Container className={`${classes.verify__page} small`}>
        <PageTitle>{title}</PageTitle>
        <div className={classes.verify__wrapper}>{child}</div>
      </Container>
      <PageDevName>type</PageDevName>
    </main>
  );
}
