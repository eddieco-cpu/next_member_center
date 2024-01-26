"use client";

import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GlobalContext } from "@contexts/globalContext";

import { getRecaptcha } from "@components/ReCaptcha";
import { Btn } from "@components/ui/Layout";

import { postForm, PHONE_ACTIVE } from "@utils/api";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

import { resendCode } from "./common";

import classes from "../page.module.scss";

export default function SMS() {
  //
  const { setIsLoading, verifyData } = useContext(GlobalContext);

  const router = useRouter();
  const params = useSearchParams();

  //
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  //星期一要測一下這個函式
  const sendCode = async () => {
    if (!code || !name) {
      return HealthModal.alert({
        title: "資料有誤",
        text: `請輸入正確資料`,
      });
    }

    const g_token = await getRecaptcha();
    const formData = {
      site: "health",
      mobile: verifyData.mobile,
      vcode: code,
      question: "您的真實姓名？",
      answer: name,
      g_token,
    };

    setIsLoading(true);

    const { data } = await postForm(basePath + PHONE_ACTIVE, formData);

    if (data.status === "200") {
      //
      const newParams = {};
      for (const [key, value] of params.entries()) {
        if (key !== "type") newParams[key] = value;
      }
      newParams.del_cookies = 1;

      HealthModal.alert({
        title: "驗證成功",
        text: "請重新登入",
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

  //
  useEffect(() => {
    if (!verifyData) return;
    if (verifyData.mobile) return;

    const newParams = {};
    for (const [key, value] of params.entries()) {
      if (key !== "type") newParams[key] = value;
    }

    router.push("/login?" + new URLSearchParams(newParams).toString());
    return;
  }, []);

  return (
    <>
      <p className={`${classes.sms__hint}`}>
        驗證碼已發送至：
        <span> {verifyData.mobile}</span>
      </p>
      <div className={`${classes.verify__input} ${classes.sms__input}`}>
        <input
          required
          type="text"
          onChange={(e) => setCode(e.target.value)}
          value={code}
          autoComplete="off"
        />
        <span>請輸入驗證碼</span>
      </div>
      <div className={`${classes.verify__input} ${classes.sms__input}`}>
        <input
          required
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <span>請輸入姓名作為安全提示</span>
      </div>
      <Btn
        className={`${classes.verify__btn} ${classes.sms__btn}`}
        onClick={() => sendCode()}
      >
        確認送出
      </Btn>
      <div className={`${classes.sms__func}`}>
        如收不到驗證碼，可要求
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            resendCode(verifyData.mobile, setIsLoading, getRecaptcha); //星期一要測一下這個函式
          }}
        >
          重寄驗證碼
        </a>
        或改用
        <Link href="/login?action=register">Email 註冊</Link>
      </div>
    </>
  );
}
