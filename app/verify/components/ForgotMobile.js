"use client";

import React, { useEffect, useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GlobalContext } from "@contexts/globalContext";

import { getRecaptcha } from "@components/ReCaptcha";
import { Btn } from "@components/ui/Layout";

import { postForm, PHONE_CHG_PWD } from "@utils/api";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

import { resendCode } from "./common";

import classes from "../page.module.scss";

export default function ForgotMobile() {
  //
  const { setIsLoading, verifyData } = useContext(GlobalContext);

  const router = useRouter();
  const params = useSearchParams();

  //
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const resetMobilePassword = async () => {
    if (!code || !password || !confirmPassword) {
      HealthModal.alert({
        title: "請輸入完整資料",
        text: "請輸入完整資料",
      });
      return;
    }

    if (password !== confirmPassword) {
      HealthModal.alert({
        title: "密碼不相符",
        text: "密碼不相符",
      });
      return;
    }

    const g_token = await getRecaptcha();
    const formData = {
      site: "health",
      mobile: verifyData.mobile,
      resndpwdno: verifyData.resndpwdno,
      password,
      vcode: code,
      answer: name,
      g_token,
    };

    setIsLoading(true);

    const { data } = await postForm(basePath + PHONE_CHG_PWD, formData);

    if (data.status === "200") {
      //
      const newParams = {};
      for (const [key, value] of params.entries()) {
        if (key !== "type") newParams[key] = value;
      }
      newParams.del_cookies = 1;

      HealthModal.alert({
        title: "重設密碼",
        text: "密碼已重設，請重新登入",
        options: {
          maskCallback: true,
          closeCallback: true,
        },
        callback: () => {
          setIsLoading(false);
          router.push("/login?" + new URLSearchParams(newParams).toString());
        },
      });
      return;
      //
    } else {
      return HealthModal.alert({
        title: data.status,
        text: data.message,
        options: {
          maskCallback: true,
          closeCallback: true,
        },
        callback: () => {
          setIsLoading(false);
        },
      });
    }
  };

  useEffect(() => {
    if (!verifyData) return;
    if (verifyData.mobile && verifyData.resndpwdno) return;

    var newParams = {};
    for (const [key, value] of params.entries()) {
      if (key !== "type") newParams[key] = value;
    }
    router.push("/login?" + new URLSearchParams(newParams).toString());
    return;
  }, []);

  return (
    <>
      <p className={classes.sms__hint}>
        驗證碼已發送至：
        <span> {verifyData.mobile}</span>
      </p>
      <div className={classes.verify__input + " " + classes.sms__input}>
        <input
          required
          type="text"
          onChange={(e) => setCode(e.target.value)}
          value={code}
          autoComplete="off"
        />
        <span>請輸入驗證碼</span>
      </div>
      <div className={classes.verify__input + " " + classes.sms__input}>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <span>請輸入新密碼</span>
      </div>
      <div className={classes.verify__input + " " + classes.sms__input}>
        <input
          required
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <span>再次輸入密碼</span>
      </div>
      <div className={classes.verify__input + " " + classes.sms__input}>
        <input
          required
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <span>安全性問題：您的真實姓名?</span>
      </div>
      <Btn
        className={classes.verify__input + " " + classes.sms__btn}
        onClick={() => resetMobilePassword()}
      >
        確認送出
      </Btn>
      <div className={classes.sms__func}>
        如收不到驗證碼，可要求
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            resendCode(verifyData.mobile, setIsLoading, getRecaptcha, false);
          }}
        >
          重寄驗證碼
        </a>
      </div>
    </>
  );
}
