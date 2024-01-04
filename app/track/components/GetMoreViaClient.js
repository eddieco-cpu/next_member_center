"use client";

import React, { useState } from "react";
import CourseCard from "./CourseCard";
import ShowMore from "./ShowMore";

import { getData } from "@utils/api";
import { doWait } from "@utils/helper";

import classes from "../author/1005/[track_id]/page.module.scss";

export default function GetMoreViaClient({ id }) {
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
      <ul
        className={`${classes.track__theme} ${classes["track__theme--video"]}`}
      >
        {trackData.map((el) => (
          <CourseCard key={el.slug} {...el} />
        ))}
      </ul>
      <ShowMore
        className={`${classes["track__more"]} ${classes["track__more--video"]}`}
        showMoreAPI={showMoreAPI}
        showMoreClassName={showMoreClassName}
        type="course"
      />
    </>
  );
}
