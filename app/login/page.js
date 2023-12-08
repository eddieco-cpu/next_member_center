import Image from "next/image";

import PageTitle from "../components/ui/PageTitle";
import LoginForm from "../components/page/LoginForm";

import styles from "./page.module.scss";

export default function Login() {
  return (
    <main className="page_body">
      <PageTitle>Login</PageTitle>
      <section className={styles.main}>
        <LoginForm />
      </section>
    </main>
  );
}
