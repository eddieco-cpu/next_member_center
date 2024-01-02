import Image from "next/image";
import { cookies } from "next/headers";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";
import classes from "./page.module.scss";

import { convertCookieObjArrayToString } from "@utils/helper";
import { fetchDataWithCookieInServer, TRACK_STATE } from "@utils/api";

import Avater from "./components/Avater";

export default async function Page() {
  //
  const cookieStore = cookies();

  const udnmember = cookieStore.get("udnmember");
  const udngold = cookieStore.get("udngold");
  const udnland = cookieStore.get("udnland");
  const um2 = cookieStore.get("um2");

  console.log("udnmember: ", udnmember);
  console.log("udngold: ", udngold);
  console.log("udnland: ", udnland);
  console.log("um2: ", um2);

  const cookieString = convertCookieObjArrayToString([
    udngold,
    udnland,
    um2,
    udnmember,
  ]);

  const trackState = await fetchDataWithCookieInServer(
    TRACK_STATE,
    cookieString
  );
  const tracklist = trackState.list || [];

  return (
    <main className="page_body">
      <Container className={` small ${classes.track__wrapper}`}>
        <PageTitle>您正在追蹤的專家</PageTitle>
        <div className={classes.track__container}>
          <ul className={classes.lineup__group}>
            {tracklist.map((el) => (
              <Avater key={el.track_id} {...el} />
            ))}
          </ul>
        </div>
      </Container>
      <PageDevName>track</PageDevName>
    </main>
  );
}
