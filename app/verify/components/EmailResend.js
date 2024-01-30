"use client";

import React, { useEffect, useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GlobalContext } from "@contexts/globalContext";

import { getRecaptcha } from "@components/ReCaptcha";
import { Btn } from "@components/ui/Layout";

import { postForm, EMAIL_RESEND } from "@utils/api";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

import { emailValidator } from "@utils/validator";
import classes from "../page.module.scss";

//not tested
export default function EmailResend() {
  //
  const [email, setEmail] = useState("");
  const { setIsLoading } = useContext(GlobalContext);

  const sendEmail = async () => {
    if (!emailValidator(email)) {
      return HealthModal.alert({
        title: "Email 格式錯誤",
        text: `請輸入正確的 Email 格式`,
      });
    }
    setIsLoading(true);
    const g_token = await getRecaptcha();
    const formData = {
      site: "health",
      email,
      g_token,
      redir_url: window.location.href,
    };

    const { data } = await postForm(basePath + EMAIL_RESEND, formData);
    if (data.status === "200") {
      return HealthModal.alert({
        title: "重寄驗證信",
        text: `已寄出驗證信至 ${email}`,
        options: {
          maskCallback: true,
          closeCallback: true,
        },
        callback: () => {
          setIsLoading(false);
        },
      });
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

  return (
    <>
      <p className={classes.resend__hint}>
        沒有收到會員啟用信時，建議您到垃圾郵件夾查看，或輸入您註冊時所登錄的
        Email，送出後將重新寄發一封會員啟用信。
      </p>
      <div className={`${classes.verify__input} ${classes.resend__input}`}>
        <input
          required
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <span>請輸入Email</span>
      </div>
      <Btn className={classes.verify__btn} onClick={() => sendEmail()}>
        確認送出
      </Btn>
    </>
  );
}
