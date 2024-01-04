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
import SessionCard from "../../../components/SessionCard";
import ArticleCard from "../../../components/ArticleCard";
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
        <div className={classes.author__container}>
          {/* ===============  back to track list page ================ */}
          <Link href={`/track`} className={classes.linker}>
            <i className="i-arrow7-left"></i>
            回列表頁
          </Link>

          {/* ===============  avater  ================ */}
          <ul className={classes.track__avater}>
            <Avater {...trackItem} needSpecialist={true} />
          </ul>

          {/* ===============  session  =============== */}
          {trackData?.list?.session?.length ? (
            <>
              <ThemeTitle>活動專區</ThemeTitle>

              <ul
                className={`${classes.track__theme} ${classes["track__theme--video"]}`}
              >
                {trackData?.list?.session.map((el) => (
                  <SessionCard key={el.slug} {...el} />
                ))}
              </ul>
              {trackData.hasMore.includes("session") && (
                <GetMoreViaClient
                  id={params.track_id}
                  type="session"
                  themeClassName={classes["track__theme--video"]}
                  moreClassName={classes["track__more--video"]}
                />
              )}
            </>
          ) : (
            ""
          )}

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
              {trackData.hasMore.includes("course") && (
                <GetMoreViaClient
                  id={params.track_id}
                  type="course"
                  themeClassName={classes["track__theme--video"]}
                  moreClassName={classes["track__more--video"]}
                />
              )}
            </>
          ) : (
            ""
          )}

          {/* ===============  article  =============== */}
          {trackData?.list?.article?.length ? (
            <>
              <ThemeTitle>文章專區</ThemeTitle>
              <ul
                className={`${classes.track__theme} ${classes["track__theme--article"]}`}
              >
                {trackData?.list?.article.map((el) => (
                  <ArticleCard key={el.art_id} {...el} />
                ))}
              </ul>
              {trackData.hasMore.includes("article") && (
                <GetMoreViaClient
                  id={params.track_id}
                  type="article"
                  themeClassName={classes["track__theme--article"]}
                  moreClassName={classes["track__more--article"]}
                />
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
