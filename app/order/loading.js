import { PageTitle, Container } from "@components/ui/Layout";

export default function Loading() {
  return (
    <main className={"page_body"}>
      <Container className={` small`}>
        <PageTitle>訂單明細</PageTitle>
        <div className="loading loading--server"></div>
      </Container>
    </main>
  );
}
