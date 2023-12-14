import Image from "next/image";

import PageTitle from "@components/ui/PageTitle";
import Form from "./components/Form";

export default function Page() {
  return (
    <main className="page_body">
      <section className={"page_body_container"}>
        <Form />
      </section>
      <PageTitle>user / profile</PageTitle>
    </main>
  );
}
