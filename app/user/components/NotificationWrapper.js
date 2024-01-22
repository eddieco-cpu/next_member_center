"use client";

import React, { useContext, useEffect } from "react";
import { GlobalContext } from "@contexts/globalContext";
import NotificationList from "./NotificationList";

import classes from "../page.module.scss";

export default function NotificationWrapper() {
  //
  const { getNotification, notificationData } = useContext(GlobalContext);

  useEffect(() => {
    getNotification();
  }, []);

  //
  return (
    <>
      {notificationData.lists?.length ? (
        notificationData.lists
          .slice(0, 3)
          .map((data) => <NotificationList data={data} key={data.id} />)
      ) : (
        <p className={classes.messenge__dom}>尚無通知</p>
      )}
    </>
  );
}
