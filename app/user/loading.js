import { PageTitle, Container } from "@components/ui/Layout";

export default function Loading() {
  return (
    <main className={"page_body"}>
      <Container className={` small`}>
        <PageTitle>用戶狀態</PageTitle>
        <div className="loading loading--server"></div>
      </Container>
    </main>
  );
}
