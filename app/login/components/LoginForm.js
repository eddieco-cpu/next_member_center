"use client";
// 測試 api 用的組件，現在沒用到

import { useRef, useState, useMemo } from "react";

import { postForm } from "@utils/api.js";

import { getRecaptcha } from "@components/ReCaptcha";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

function LoginForm() {
  //
  async function testRecaptcha() {
    let token = await getRecaptcha();
    console.log(token);
  }

  async function emailLogin({ email, password }) {
    //
    let gToken = await getRecaptcha();
    console.log(gToken);

    if (!gToken) return console.log("recaptcha failed");

    const formData = {
      site: "health",
      email,
      password,
      g_token: gToken,
    };

    try {
      const { data } = await postForm(
        BASE_PATH + "/do/member/wbs/MemberEmailLogin", //交給 proxy 處理 CORS
        formData
      );
      console.log("login data: ", data);
    } catch (error) {
      console.error("login error: ", error);
    }
  }

  async function onEmailLogin(e) {
    e.preventDefault();

    const {
      email: { value: email },
      password: { value: password },
    } = e.target;

    console.log(email, password);

    if (!email || !password) return console.log("empty email or password");

    emailLogin({ email, password });
  }

  return (
    <div>
      <button onClick={testRecaptcha}>test recaptcha</button>
      <form className="login_form" onSubmit={onEmailLogin}>
        <br />
        信箱: <input type="email" name="email" />
        <br />
        <br />
        密碼: <input type="password" name="password" />
        <br />
        <br />
        <input type="submit" value="email login" />
        {/* <button onClick={emailLogin}>email login</button> */}
      </form>
      <br />
      <input type="button" value="google login" />
      <br />
      <br />

      <input type="button" value="login via server" />
      <br />
      <br />
    </div>
  );
}

export default LoginForm;
