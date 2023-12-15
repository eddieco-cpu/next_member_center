import Image from "next/image";

import PageDevName from "@components/ui/PageDevName";
import Form from "./components/Form";

export default function Page() {
  return (
    <main className="page_body">
      <section className={"page_body_container"}>
        <Form />
      </section>
      <PageDevName>user / profile</PageDevName>
    </main>
  );
}
