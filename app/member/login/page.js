import Image from "next/image";
import Link from "next/link";
import { BASE_PATH } from "@/utils/api";

import { Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";
//import LoginForm from "./components/LoginForm";
import FormBody from "./components/FormBody";

import classes from "./page.module.scss";

export default function Login({ searchParams: params }) {
  //
  // console.log(
  //   "new URLSearchParams(obj).toString()",
  //   new URLSearchParams({ ...searchParams }).toString()  //將 params obj 轉換成查詢字串
  // );

  return (
    <main className="page_body">
      <Container className={`${classes.login__page} small`}>
        <section className={classes.login__container}>
          <div className={classes.login__header}>
            <Link
              href={
                BASE_PATH +
                "/login?" +
                new URLSearchParams({
                  ...params,
                  action: "login",
                }).toString()
              }
              className={`${classes.login__tab} 
                ${classes["login__tab--left"]} 
                ${params.action !== "register" ? ` ${classes.active}` : ""}`}
            >
              <span>登入</span>
            </Link>
            <Link
              href={
                BASE_PATH +
                "/login?" +
                new URLSearchParams({
                  ...params,
                  action: "register",
                }).toString()
              }
              className={`${classes.login__tab} 
              ${classes["login__tab--right"]} 
              ${params.action === "register" ? ` ${classes.active}` : ""}`}
            >
              <span>註冊</span>
            </Link>
          </div>

          <FormBody></FormBody>
          {/* <LoginForm></LoginForm> */}
        </section>
      </Container>
      <PageDevName>Login</PageDevName>
    </main>
  );
}
