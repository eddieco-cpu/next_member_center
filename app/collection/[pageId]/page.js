import Image from "next/image";

import PageTitle from "@components/ui/PageTitle";

export default function Page({ params: { pageId } }) {
  return (
    <main className="page_body">
      <section className={"page_body_container"}></section>
      <PageTitle>collection / {pageId}</PageTitle>
    </main>
  );
}
