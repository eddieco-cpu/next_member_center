"use client";

import { useRef, useState, useMemo } from "react";

import { loginDomain, postForm } from "@utils/api.js";

import ReCaptcha, { getRecaptcha } from "../ReCaptcha";

function LoginForm() {
  //
  async function testRecaptcha() {
    let token = await getRecaptcha();
    console.log(token);
  }

  // async function emailLogin() {
  //   let gToken = await getRecaptcha();
  //   console.log(gToken);

  //   if (!gToken) return console.log("recaptcha failed");

  //   const formData = {
  //     site: "health",
  //     email: "dodowu@naver.com",
  //     password: "1234dodo",
  //     g_token: gToken,
  //   };

  //   try {
  //     const { data } = await postForm(
  //       loginDomain + "/do/member/wbs/MemberEmailLogin", //- /do
  //       formData
  //     );
  //     console.log("login data: ", data);
  //   } catch (error) {
  //     console.error("login error: ", error);
  //   }
  // }

  return (
    <div>
      <button onClick={testRecaptcha}>test recaptcha 222</button>
      <div className="login_form">
        <br />
        信箱: <input type="email" />
        <br />
        <br />
        密碼: <input type="password" />
        <br />
        <br />
        {/* <input type="submit" value="email login" /> */}
        {/* <button onClick={emailLogin}>email login</button> */}
      </div>
      <br />
      <input type="button" value="google login" />
      <br />
      <br />

      <input type="button" value="login via server" />
      <br />
      <br />

      <ReCaptcha />
    </div>
  );
}

export default LoginForm;
