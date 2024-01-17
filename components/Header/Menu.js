"use client";

import React, { useContext, useState, useEffect } from "react";

import { HeaderContext } from "@contexts/headerContext";
import UserDropdown from "./UserDropdown";
import classes from "./index.module.scss";

export default function Menu() {
  //
  const { setSwitchOverLayMenu } = useContext(HeaderContext);
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const test = () => {
    HealthModal.alert({
      title: "", //data.status
      text: "test",
    });
  };

  //
  useEffect(() => {
    console.log("isMemberOpen", isMemberOpen);
  }, [isMemberOpen]);

  //
  return (
    <section className={classes.menu}>
      <div className={classes.member__container}>
        <i
          style={{ outline: "1px solid orange" }}
          className={
            (true ? "i-user-news" : "i-user-not-login") +
            " " +
            classes["member-btn"]
          }
          onClick={() => setIsMemberOpen(true)}
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
        <i className="i-notification" onClick={test}></i>
      </div>
    </section>
  );
}
