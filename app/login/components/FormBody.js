"use client";

import { useSearchParams } from "next/navigation";
import classes from "../page.module.scss";

import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";

export default function Form() {
  //
  const params = useSearchParams();
  console.log("params", params.get("action"));

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
