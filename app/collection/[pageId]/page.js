import Image from "next/image";

import PageDevName from "@components/ui/PageDevName";

export default function Page({ params: { pageId } }) {
  return (
    <main className="page_body">
      <section className={"page_body_container"}></section>
      <PageDevName>collection / {pageId}</PageDevName>
    </main>
  );
}
