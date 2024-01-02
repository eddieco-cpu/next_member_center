import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";
//import classes from "./page.module.scss";

import { convertCookieObjArrayToString } from "@utils/helper";
import { fetchDataWithCookieInServer, TRACK_STATE } from "@utils/api";

//import Avater from "./components/Avater";

async function fetchData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export default async function Page({ params }) {
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

  const tracklist = trackState.list || [];
  const trackItem = tracklist.find(
    (el) => el.track_id.toString() === params.track_id
  );

  if (!trackItem) {
    redirect("/track");
  }

  //
  const data = await fetchData(
    `http://localhost:3006/api/track/expert?author_id=${params.track_id}&per_page=6`
  );
  console.log("data: ", data);

  //
  return (
    <main className="page_body">
      <Container className={` small`}>
        <PageTitle>{params.track_id}</PageTitle>
      </Container>
      <PageDevName>track</PageDevName>
    </main>
  );
}
