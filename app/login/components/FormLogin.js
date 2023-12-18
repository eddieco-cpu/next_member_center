"use client";

import { Link } from "next/link";

import { useState } from "react";
import classes from "../page.module.scss";

import { Btn, CheckboxInput, TextInput } from "@components/ui/Layout";
import Form3rdParty from "./Form3rdParty";

export default function FormLogin() {
  //
  const [rememberAcc, setRememberAcc] = useState(false);
  const [pw, setPw] = useState("");
  const [acc, setAcc] = useState("");

  //return "FormLogin";

  return (
    <>
      <TextInput className={classes.login__input}>
        <input
          onChange={(e) => setAcc(e.target.value)}
          required
          type="text"
          value={acc}
        />
        <span>電子信箱或台灣手機號碼</span>
      </TextInput>
      <TextInput className={classes.login__input}>
        <input
          onChange={(e) => setPw(e.target.value)}
          required
          type="password"
          value={pw}
        />
        <span>密碼</span>
      </TextInput>
      <div className={classes.login__setting}>
        <CheckboxInput>
          <input
            type="checkbox"
            id="rememberAccount"
            checked={rememberAcc}
            onChange={() => {
              setRememberAcc(!rememberAcc);
            }}
          />
          <label htmlFor="rememberAccount">記住我的帳號</label>
        </CheckboxInput>
        <div className={classes["login__setting--right"]}>
          {/* <Link to="/forgot">忘記密碼</Link>
          <Link to="/verify?type=resend">重寄啟用信</Link> */}
        </div>
      </div>
      <div className={classes.login__button__wrapper}>
        <Btn className={classes.login__button}>登入</Btn>
        <Form3rdParty />
      </div>
      <div className={classes.login__note}>
        無法登入 ?
        <a
          href="/member/login?openExternalBrowser=1&action=login"
          target="__blank"
          className={classes["login__note--link"]}
        >
          請用預設瀏覽器開啟
        </a>
      </div>
    </>
  );
}
