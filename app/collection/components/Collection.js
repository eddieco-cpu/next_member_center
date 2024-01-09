"use client";

import React, { useState } from "react";

import classes from "../page.module.scss";
import CollectionRemove from "./CollectionRemove";

export default function Collection({ data }) {
  const {
    id,
    titleLink,
    cateLink,
    url,
    cateTitle,
    title,
    paragraph,
    time,
    content_level,
    slotname,
  } = data;

  const [isAppear, setIsAppear] = useState(true);

  if (!isAppear) {
    return null;
  } else {
    return (
      <article href={titleLink} className={`${classes.collection}`}>
        <div className={`${classes.collection__image}`}>
          <a
            href={titleLink}
            title={title}
            data-content_level={content_level}
            data-slotname={slotname}
          >
            <picture>
              <source
                data-srcset={url + "&nt=1"}
                srcSet={url + "&nt=1"}
                type="image/webp"
              />
              <img
                className={`${classes.lazyload}`}
                data-src={url}
                alt={title}
              />
            </picture>
          </a>
          <a
            className={`${classes.collection__tag} ${classes["collection__tag--spec"]}`}
            href={cateLink}
          >
            {cateTitle}
          </a>
        </div>
        <a
          href={titleLink}
          className={`${classes.collection__content}`}
          title={title}
          data-content_level={content_level}
          data-slotname={slotname}
        >
          <h2 className={`${classes.collection__title}`}>{title}</h2>
          <p className={`${classes.collection__desc}`}>{paragraph}</p>
          <time>
            {time.date.slice(0, -3)
            //   ? time?.date.slice(0, -3)
            //   : time?.date.split(' ')[0]
            }
          </time>
        </a>
        <CollectionRemove collectionId={id} {...{ setIsAppear }} />
      </article>
    );
  }
}
