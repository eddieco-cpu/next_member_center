"use client";
import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { fetchData, TRACK_EXPERT } from "@utils/api";
import PopupFrame from "@components/ui/PopupFrame";

import classes from "@track/page.module.scss";

import Avater from "@track/components/Avater";
import CourseCard from "@track/components/CourseCard";
import SessionCard from "@track/components/SessionCard";
import ArticleCard from "@track/components/ArticleCard";
import GetMoreViaClient from "@track/components/GetMoreViaClient";
import { ThemeTitle } from "@components/ui/Layout";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

export default function ClientContainer({ track_id, tracklist }) {
  //
  const router = useRouter();
  const [trackData, setTrackData] = useState({});

  useEffect(() => {
    async function doFetchData() {
      const fetchedTrackData = await fetchData(
        `${BASE_PATH}${TRACK_EXPERT}?author_id=${track_id}&per_page=6`
      );
      setTrackData(fetchedTrackData);
    }
    doFetchData();
  }, []);

  const trackItem = tracklist.find((el) => el.track_id.toString() === track_id);

  const onTogglePrev = () => {
    if (tracklist.length <= 1) return;
    const prevTrackIndex =
      (tracklist.findIndex((el) => el.track_id == track_id) -
        1 +
        tracklist.length) %
      tracklist.length;
    const prevTrack = tracklist[prevTrackIndex];
    router.replace(`/track/author/1005/${prevTrack.track_id}`);
  };
  const onToggleNext = () => {
    if (tracklist.length <= 1) return;
    const nextTrackIndex =
      (tracklist.findIndex((el) => el.track_id == track_id) + 1) %
      tracklist.length;
    const nextTrack = tracklist[nextTrackIndex];
    router.replace(`/track/author/1005/${nextTrack.track_id}`);
  };

  return (
    <>
      <PopupFrame {...{ onTogglePrev, onToggleNext }}>
        <div
          className={`${classes.author__container} ${classes["author__container--popup"]}`}
        >
          {/* ===============  avater  ================ */}
          <ul className={classes.track__avater}>
            <Avater
              {...trackItem}
              needSpecialist={true}
              hideSubscribeBtn={true}
            />
          </ul>

          <section className={classes["track__data-list"]}>
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
                    id={track_id}
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
                    id={track_id}
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
                    id={track_id}
                    type="article"
                    themeClassName={classes["track__theme--article"]}
                    moreClassName={classes["track__more--article"]}
                  />
                )}
              </>
            ) : (
              ""
            )}
          </section>
        </div>
      </PopupFrame>
    </>
  );
}
