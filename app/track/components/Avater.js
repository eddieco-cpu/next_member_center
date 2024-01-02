"use client";
import Link from "next/link";

import React, { useState } from "react";
import classes from "../page.module.scss";
import SubscribeButton from "./SubscribeButton";

export default function Avater(props) {
  const { track_id, title } = props;
  const [isSubscribed, setIsSubscribed] = useState(true);

  if (isSubscribed) {
    return (
      <li
        className={`${classes["item-listing__photo-circle"]} ${classes["circle-pic-item__wrapper"]}`}
      >
        <SubscribeButton {...{ track_id, title, setIsSubscribed }} />
        {props.needSpecialist && props.specialist ? (
          <a
            className={`${classes["circle-pic-item__type-link"]}`}
            href={`/health/expert/lists/1005?section=${props.specialist}`}
          >
            {props.specialist}
          </a>
        ) : (
          ""
        )}
        <Link
          // to={`/track/author/1005/${props.track_id}`}
          href={`/track/author/1005/${props.track_id}`}
          className={`${classes["circle-pic-item__substance"]} ${
            props.needSpecialist &&
            classes["circle-pic-item__substance--lifeless"]
          }`}
        >
          <picture className={`${classes["circle-pic-item__photo"]}`}>
            <img alt="" src={props.author_pic} />
          </picture>

          <article className={`${classes["circle-pic-item__para"]}`}>
            <h3 className={`${classes["circle-pic-item__title"]}`}>
              {props.title}
            </h3>
            <p className={`${classes["circle-pic-item__description"]}`}>
              {props.author_title}
            </p>
          </article>
        </Link>
      </li>
    );
  } else {
    return <></>;
  }
}
