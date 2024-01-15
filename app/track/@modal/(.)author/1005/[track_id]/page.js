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

  console.log("@@@@@ parallal @@@@")

  return (
    <>
      <div>@@@@@@</div> 
      {/* 目前還無解，basePath 與 parallel 衝突，等待官方上線 14.0.5 */}
      {/* <ClientContainer {...{ track_id, tracklist }}></ClientContainer> */}
    </>
  );
}
