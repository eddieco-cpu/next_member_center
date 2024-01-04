import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { PageTitle, Container } from "@components/ui/Layout";
import PageDevName from "@components/ui/PageDevName";
import classes from "./page.module.scss";

import { convertCookieObjArrayToString } from "@utils/helper";
import { fetchDataWithCookieInServer, TRACK_STATE } from "@utils/api";

import Avater from "../../../components/Avater";
import CourseCard from "../../../components/CourseCard";
import GetMoreViaClient from "../../../components/GetMoreViaClient";
import { ThemeTitle } from "@components/ui/Layout";

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
  const trackData = await fetchData(
    `http://localhost:3006/api/track/expert?author_id=${params.track_id}&per_page=6`
  );
  console.log("trackData: ", trackData);

  //
  return (
    <main className="page_body">
      <Container className={` small ${classes.track__wrapper}`}>
        {/* <PageTitle>{params.track_id}</PageTitle> */}
        <div className={classes.author__container}>
          <Link href={`/track`} className={classes.linker}>
            <i className="i-arrow7-left"></i>
            回列表頁
          </Link>
          <ul className={classes.track__avater}>
            <Avater {...trackItem} needSpecialist={true} />
          </ul>

          {/* ===============  course  ================ */}
          {trackData?.list?.course?.length ? (
            <>
              <ThemeTitle>課程專區</ThemeTitle>

              <ul
                className={`${classes.track__theme} ${classes["track__theme--video"]}`}
              >
                {trackData?.list?.course.map((el) => (
                  <CourseCard key={el.slug} {...el} />
                ))}
              </ul>
              {trackData.hasMore.includes("course") ? (
                <GetMoreViaClient id={params.track_id} />
              ) : (
                <></>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </Container>
      <PageDevName>track</PageDevName>
    </main>
  );
}
