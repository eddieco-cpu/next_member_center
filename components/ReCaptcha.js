"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

//
let captchaRef = null;

//
export default function ReCaptcha() {
  captchaRef = useRef(null);

  return (
    <ReCAPTCHA
      ref={captchaRef}
      sitekey="6LePdrUZAAAAAITdHZM9mjmjSr0XYWxpaCmKHAHA"
      size="invisible"
    />
  );
}

//
export const getRecaptcha = async () => {
  let token;
  try {
    token = await captchaRef.current.executeAsync();
  } catch {
    token = false;
  }
  return token;
};
