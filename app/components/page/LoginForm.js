"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState, useMemo } from "react";

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
        <input type="submit" value="email login" />
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
