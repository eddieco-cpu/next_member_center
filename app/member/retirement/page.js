import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";
import classes from "./page.module.scss";

import Wrapper from "./components/Wrapper";

import { convertCookieObjArrayToString } from "@utils/helper";
import { fetchDataWithCookieInServer, fetchData } from "@utils/api";

export default async function Page() {
  //
  const cookieStore = cookies();

  const udnmember = cookieStore.get("udnmember");
  const udngold = cookieStore.get("udngold");
  const udnland = cookieStore.get("udnland");
  const um2 = cookieStore.get("um2");

  const cookieString = convertCookieObjArrayToString([
    udngold,
    udnland,
    um2,
    udnmember,
  ]);

  //fetch 1. -> client data of retirement test (result and slope)
  const clientResultDataAndSlopeData = await fetchDataWithCookieInServer(
    "https://lab7-health.udn.com/api/retire",
    cookieString
  );
  if (!clientResultDataAndSlopeData) {
    redirect("/login"); //刪除 cookie，重新導向
  }

  //fetch 2. -> data for description
  const retireDataObj = await fetchData(
    "https://lab7-health.udn.com/retire.json"
  );
  if (!retireDataObj) redirect("/user");

  //fetch 3. -> data for all client's average
  const avgDataObj = await fetchData(
    "https://lab7-health.udn.com/api/retire/data"
  );
  if (!avgDataObj) redirect("/user");

  return (
    <main className={`page_body`}>
      <Container className={`small ${classes.retirement}`}>
        <PageTitle>退休力檢測</PageTitle>
        <Wrapper
          {...{ retireDataObj, avgDataObj, clientResultDataAndSlopeData }}
        />
      </Container>
      <PageDevName>retirement</PageDevName>
    </main>
  );
}
