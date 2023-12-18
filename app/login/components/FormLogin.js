"use client";

import Link from "next/link";

import { useState } from "react";
import classes from "../page.module.scss";

import { Btn, CheckboxInput, TextInput } from "@components/ui/Layout";
import Form3rdParty from "./Form3rdParty";

import { loginDomain, postForm } from "@utils/api";
import { getRecaptcha } from "@components/ReCaptcha";
import { emailValidator, mobileNumberValidator } from "@utils/validator";

export default function FormLogin() {
  //
  const [rememberAcc, setRememberAcc] = useState(false);
  const [pw, setPw] = useState("");
  const [acc, setAcc] = useState("");

  //
  async function handleLogin() {
    //
    const handler = {
      validator: null,
      address: "",
    };

    switch (true) {
      case mobileNumberValidator(acc):
        handler.validator = "mobile";
        handler.address = "/do/member/wbs/MemberMobileLogin";
        break;
      case emailValidator(acc):
        handler.validator = "email";
        handler.address = "/do/member/wbs/MemberEmailLogin";
        break;
      default:
        HealthModal.alert({
          title: "格式錯誤",
          text: "請輸入正確電子信箱或台灣手機號碼格式",
        });
        return;
    }

    console.log("handler: ", handler);

    let gToken = await getRecaptcha();
    if (!gToken) {
      HealthModal.alert({
        title: "Error",
        text: "Google 驗證錯誤",
      });
      return;
    }

    const formData = {
      site: "health",
      password: pw,
      [handler.validator]: acc,
      g_token: gToken,
    };

    try {
      const { data } = await postForm(
        loginDomain + handler.address, //- /do
        formData
      );
      console.log("login data: ", data); //to be continued
    } catch (error) {
      console.error("login error: ", error);
    }
  }

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
          <Link href="/order">忘記密碼</Link>
          <Link href="/orders">重寄啟用信</Link>
        </div>
      </div>
      <div className={classes.login__button__wrapper}>
        <Btn className={classes.login__button} onClick={handleLogin}>
          登入
        </Btn>
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
