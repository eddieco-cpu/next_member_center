"use client";

import { usePathname } from "next/navigation";

import React, { useContext } from "react";
import { GlobalContext } from "@contexts/globalContext";

import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("zh-tw");

import classes from "../page.module.scss";

export default function NotificationList({
  data,
  isUsedInHeader = false,
  headerClasses = null,
}) {
  //
  const pathname = usePathname();
  const { readNotification } = useContext(GlobalContext);

  const notificationPageJudge = /notification/.test(pathname);
  const { link, text, time, read, id } = data;

  const handleNotificationLinkClick = async () => {
    await readNotification(id);
    window.location.href = link;
  };

  if (!isUsedInHeader) {
    return (
      <ul className={classes["notification-list"]}>
        <div className={classes.messenge + " " + (!read ? classes.unread : "")}>
          <p className={classes.marker}>．</p>
          <p
            className={classes.messenge__link}
            target="_blank"
            onClick={handleNotificationLinkClick}
          >
            <span className={notificationPageJudge ? "" : classes["one-line"]}>
              {text}
            </span>
            <time>{dayjs().to(dayjs(time.timestamp * 1000))}</time>
          </p>
        </div>
      </ul>
    );
  } else {
    return (
      <div
        className={
          headerClasses.notification + " " + (read ? "" : headerClasses.unread)
        }
      >
        <i className={"i-star-filled " + headerClasses["i-star-filled"]}></i>
        <p onClick={handleNotificationLinkClick}>
          <span>{text}</span>
          <time>{dayjs().to(dayjs(time.timestamp * 1000))}</time>
        </p>
      </div>
    );
  }
}
