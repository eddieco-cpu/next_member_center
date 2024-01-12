"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import { Btn } from "@components/ui/Layout";
import classes from "../page.module.scss";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

export default function Form3rdParty() {
  //
  const params = useSearchParams();

  function loginWord() {
    return params.get("action") !== "register" ? "登入" : "註冊";
  }

  return (
    <>
      <p className={`${classes.login__divider}`} />
      <Btn
        className={`${classes.login__button} ${classes["login__button--fb"]}`}
      >
        <img src={`${BASE_PATH}/fb.png`} alt={`Facebook ${loginWord()}`} />
        Facebook {loginWord()}
      </Btn>
      <Btn
        className={`${classes.login__button} ${classes["login__button--google"]}`}
      >
        <img src={`${BASE_PATH}/google.png`} alt={`Google ${loginWord()}`} />
        Google {loginWord()}
      </Btn>
      <Btn
        className={`${classes.login__button} ${classes["login__button--apple"]}`}
      >
        <img src={`${BASE_PATH}/apple.png`} alt={`Apple ${loginWord()}`} />
        AppleID {loginWord()}
      </Btn>
    </>
  );
}
