"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useContext } from "react";
import cookies from "js-cookie";
import classes from "../page.module.scss";

import { GlobalContext } from "@contexts/globalContext";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";

export default function Form() {
  //
  const { forcedLogout } = useContext(GlobalContext);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    console.log("@@@ params check @@@");
    //
    if (!params.has("del_cookies") || params.get("del_cookies") != 1) return;

    // if params has del_cookies=1, delete cookies
    if (
      cookies.get("udnmember") ||
      cookies.get("udnland") ||
      cookies.get("udngold") ||
      cookies.get("um2")
    ) {
      forcedLogout();
    }

    var newParams = {};
    for (const [key, value] of params.entries()) {
      if (key !== "del_cookies") newParams[key] = value;
    }
    router.replace("/login?" + new URLSearchParams(newParams).toString());
  }, [params]);

  // params.forEach((value, key) => {
  //   console.log(" params ==>", key, value);  //取得所有參數
  // });

  //
  return (
    <>
      <div className={classes.login__body}>
        <h2 className={classes.login__hint}>
          {params.get("action") !== "register"
            ? "E-mail / 手機登入"
            : "電子信箱或手機註冊"}
        </h2>
        <div className={classes.login__form}>
          {params.get("action") !== "register" ? (
            <FormLogin />
          ) : (
            <FormRegister />
          )}
        </div>
      </div>
    </>
  );
}
