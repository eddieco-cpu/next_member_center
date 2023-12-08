"use client";

import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState, useMemo } from "react";

import { loginDomain, postForm } from "../../utils/api.js";

function LoginForm() {
  //
  const captchaRef = useRef(null);
  const captchaDOM = useMemo(() => ({ captchaRef }), [captchaRef]);

  async function getRecaptcha() {
    let token;
    try {
      token = await captchaRef.current.executeAsync();
    } catch {
      token = false;
    }
    return token;
  }

  async function testRecaptcha() {
    let token = await getRecaptcha();
    console.log(token);
  }

  async function emailLogin() {
    let gToken = await getRecaptcha();
    console.log(gToken);

    if (!gToken) return console.log("recaptcha failed");

    const formData = {
      site: "health",
      email: "dodowu@naver.com",
      password: "1234dodo",
      g_token: gToken,
    };

    try {
      const { data } = await postForm(
        loginDomain + "/do/member/wbs/MemberEmailLogin", //- /do
        formData
      );
      console.log("login data: ", data);
    } catch (error) {
      console.error("login error: ", error);
    }
  }

  return (
    <div>
      <button onClick={testRecaptcha}>test recaptcha</button>
      <div className="login_form">
        <br />
        信箱: <input type="email" />
        <br />
        <br />
        密碼: <input type="password" />
        <br />
        <br />
        {/* <input type="submit" value="email login" /> */}
        <button onClick={emailLogin}>email login</button>
      </div>
      <br />
      <input type="button" value="google login" />
      <br />
      <br />

      <input type="button" value="login via server" />
      <br />
      <br />

      <ReCAPTCHA
        ref={captchaRef}
        sitekey={"6LePdrUZAAAAAITdHZM9mjmjSr0XYWxpaCmKHAHA"}
        size="invisible"
      />
    </div>
  );
}

export default LoginForm;
