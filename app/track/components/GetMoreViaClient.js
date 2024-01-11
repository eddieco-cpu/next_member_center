"use client";

import React, { useState } from "react";
import CourseCard from "./CourseCard";
import SessionCard from "./SessionCard";
import ArticleCard from "./ArticleCard";
import ShowMore from "./ShowMore";

import { getData } from "@utils/api";
import { doWait } from "@utils/helper";

import classes from "@track/page.module.scss";

export default function GetMoreViaClient({
  id,
  type,
  themeClassName,
  moreClassName,
}) {
  //
  const [trackData, setTrackData] = useState([]);
  const [showMoreClassName, setShowMoreClassName] = useState("");

  async function showMoreAPI(type) {
    //
    setShowMoreClassName(`${classes["show-more--clicked"]}`);

    let more = {};
    try {
      let { data } = await getData(
        `/api/expert/more?author_id=${id}&type=${type}&offset=${
          6 + trackData.length
        }&per_page=6`,
        {
          auth: true,
        }
      );
      console.log("data", data);
      more = { ...data };
    } catch (err) {
      console.log("err", err);
    }

    if (Object.keys(more).length && more.list.length) {
      await doWait(500);
      setTrackData((trackData) => [...trackData, ...more.list]);
    }

    await doWait(100);
    setShowMoreClassName(
      more.hasMore ? "" : `${classes["show-more--complete"]}`
    );
  }

  return (
    <>
      <ul className={`${classes.track__theme} ${themeClassName}`}>
        {trackData.map((el) =>
          type === "course" ? (
            <CourseCard key={el.slug} {...el} />
          ) : type === "session" ? (
            <SessionCard key={el.slug} {...el} />
          ) : type === "article" ? (
            <ArticleCard key={el.art_id} {...el} />
          ) : (
            <></>
          )
        )}
      </ul>
      <ShowMore
        className={`${classes.track__more} ${moreClassName}`}
        showMoreAPI={showMoreAPI}
        showMoreClassName={showMoreClassName}
        type={type}
      />
    </>
  );
}
