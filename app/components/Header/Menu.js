"use client";

import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import { GlobalContext } from "../../contexts/global";
import classes from "./index.module.scss";

export default function Menu(props) {
  //
  const { test, setTest, switchOverLayMenu, setSwitchOverLayMenu } =
    useContext(GlobalContext);

  //
  useEffect(() => {
    console.log("test", test);
    console.log("switchOverLayMenu", switchOverLayMenu);
  }, [test]);

  //
  const tested = () => {
    setSwitchOverLayMenu(true);
    console.log("switchOverLayMenu", switchOverLayMenu);
  };

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
        onClick={tested}
      ></i>

      <div className={classes["notification__container"]}>
        <i className="i-notification"></i>
      </div>
    </section>
  );
}
