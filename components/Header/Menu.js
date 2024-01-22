"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { HeaderContext } from "@contexts/headerContext";
import { GlobalContext } from "@contexts/globalContext";

import UserDropdown from "./UserDropdown";
import NotificationList from "@user/components/NotificationList";

import classes from "./index.module.scss";

export default function Menu() {
  //
  const router = useRouter();

  const { setSwitchOverLayMenu } = useContext(HeaderContext);
  const { notificationData } = useContext(GlobalContext);

  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const turnOnAnOpener = (type) => {
    switch (type) {
      case "member":
        setIsMemberOpen(!isMemberOpen);
        setIsNotificationOpen(false);
        break;
      case "notification":
        setIsNotificationOpen(!isNotificationOpen);
        setIsMemberOpen(false);
        break;
      default:
        break;
    }
  };

  //
  return (
    <section className={classes.menu}>
      <div className={classes.member__container}>
        <i
          className={
            (true ? "i-user-news" : "i-user-not-login") +
            " " +
            classes["member-btn"]
          }
          onClick={() => turnOnAnOpener("member")}
        ></i>
        <UserDropdown {...{ isMemberOpen, setIsMemberOpen }} />
        <div
          className={`${classes["member__wrapper--bg"]}`}
          onClick={() => setIsMemberOpen(false)}
        ></div>
      </div>

      <i
        className={classes["nav-menu"] + " i-list-search"}
        onClick={() => setSwitchOverLayMenu(true)}
      ></i>

      <div className={classes["notification__container"]}>
        <i
          className={"i-notification" + " " + classes["notification-btn"]}
          onClick={() => turnOnAnOpener("notification")}
        ></i>
        <div
          className={`${classes.notification__wrapper} ${
            isNotificationOpen ? classes.show : ""
          }`}
        >
          {/* --- */}
          {notificationData.lists &&
            notificationData.lists
              .slice(0, 3)
              .map((data, index) => (
                <NotificationList
                  data={data}
                  key={index}
                  isUsedInHeader={true}
                  headerClasses={classes}
                />
              ))}
          {/* --- */}
          {notificationData.lists && notificationData.lists.length ? (
            <button
              className={classes.notification__link}
              onClick={() => {
                router.push("/user/notification");
                setIsNotificationOpen(false);
              }}
            >
              顯示更多
            </button>
          ) : (
            <p className={classes.messenge__dom}>尚無通知</p>
          )}
        </div>
        <div
          className={`${classes["notification__wrapper--bg"]}`}
          onClick={() => setIsNotificationOpen(false)}
        ></div>
      </div>
    </section>
  );
}
