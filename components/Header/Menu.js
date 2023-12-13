"use client";

import React, { useContext } from "react";

import { HeaderContext } from "@contexts/headerContext";
import classes from "./index.module.scss";

export default function Menu() {
  //
  const { setSwitchOverLayMenu } = useContext(HeaderContext);

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
        ></i>
      </div>

      <i
        className={classes["nav-menu"] + " i-list-search"}
        onClick={() => setSwitchOverLayMenu(true)}
      ></i>

      <div className={classes["notification__container"]}>
        <i className="i-notification"></i>
      </div>
    </section>
  );
}
