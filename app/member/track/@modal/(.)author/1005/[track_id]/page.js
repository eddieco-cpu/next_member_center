import { cookies } from "next/headers";

import { convertCookieObjArrayToString } from "@utils/helper";
import { fetchDataWithCookieInServer, TRACK_STATE } from "@utils/api";

import ClientContainer from "./ClientContainer";

export default async function page({ params: { track_id } }) {
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

  const trackState = await fetchDataWithCookieInServer(
    TRACK_STATE,
    cookieString
  );
  const tracklist = trackState?.list || [];

  return (
    <>
      <ClientContainer {...{ track_id, tracklist }}></ClientContainer>
    </>
  );
}
