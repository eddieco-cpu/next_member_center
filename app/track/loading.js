import { PageTitle, Container } from "@components/ui/Layout";

export default function Loading() {
  return (
    <main className={"page_body"}>
      <Container className={` small`}>
        <PageTitle>您正在追蹤的專家</PageTitle>
        <div className="loading loading--server"></div>
      </Container>
    </main>
  );
}
