import Image from "next/image";

import PageDevName from "@components/ui/PageDevName";
import LoginForm from "./components/LoginForm";

import styles from "./page.module.scss";

export default function Login() {
  return (
    <main className="page_body">
      <PageDevName>Login</PageDevName>
      <section className={"page_body_container"}>
        <LoginForm />
      </section>
    </main>
  );
}
