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

const OverLayMenu = () => {
  //
  const { test, setTest, switchOverLayMenu, setSwitchOverLayMenu } =
    useContext(GlobalContext);

  useEffect(() => {
    console.log("switchOverLayMenu ===>", switchOverLayMenu);
  }, [switchOverLayMenu]);

  return (
    <div>
      <div
        className={
          switchOverLayMenu
            ? "overlay-menu search-menu--none search-menu--block"
            : "overlay-menu search-menu--none"
        }
      ></div>
    </div>
  );
};

export default OverLayMenu;
