import Image from "next/image";

import { Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";
import LoginForm from "./components/LoginForm";

import styles from "./page.module.scss";

export default function Login() {
  return (
    <main className="page_body">
      <Container className={` small`}>
      </Container>
      <PageDevName>Login</PageDevName>
    </main>
  );
}
