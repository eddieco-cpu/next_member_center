import Image from "next/image";

import PageTitle from "../components/ui/PageTitle";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={"page_body"}>
      <PageTitle>Home</PageTitle>
    </main>
  );
}
