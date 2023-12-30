import Image from "next/image";
import { cookies } from "next/headers";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";

import {convertCookieObjArrayToString} from "@utils/helper";
import {fetchDataWithCookieInServer, TRACK_STATE} from "@utils/api";

export default async function Page() {
  //
  const cookieStore = cookies();

  const udnmember = cookieStore.get('udnmember');
  const udngold = cookieStore.get('udngold');
  const udnland = cookieStore.get('udnland');
  const um2 = cookieStore.get('um2');

  console.log("udnmember: ", udnmember);
  console.log("udngold: ", udngold);
  console.log("udnland: ", udnland);
  console.log("um2: ", um2);

  const cookieString = convertCookieObjArrayToString([udngold, udnland, um2, udnmember]);

  const trackState = await fetchDataWithCookieInServer(TRACK_STATE, cookieString);
  console.log("trackState: \n", trackState);

  return (
    <main className="page_body">
        <Container className={` small`}>
        <PageTitle>您正在追蹤的專家</PageTitle>
      </Container>
      <PageDevName>track</PageDevName>
    </main>
  );
}
