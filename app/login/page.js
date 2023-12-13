import Image from "next/image";

import PageTitle from "@components/ui/PageTitle";
import LoginForm from "@/components/pages/LoginForm2";

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
