"use client";
import React from "react";

import classes from "../author/1005/[track_id]/page.module.scss";

export default function ShowMore({
  className,
  showMoreAPI,
  type,
  showMoreClassName,
}) {
  const showMoreClasses = (showMoreClassName = "") => showMoreClassName;

  return (
    <div className={className}>
      <div
        className={`${classes["show-more__wrapper"]} ${showMoreClasses(
          showMoreClassName
        )}`}
      >
        <b
          className={`${classes["show-more__btn"]}`}
          onClick={() => showMoreAPI(type)}
        >
          More <i className="i-arrow5-down"></i>
        </b>
      </div>
    </div>
  );
}
