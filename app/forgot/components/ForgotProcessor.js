"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";

import { Btn } from "@components/ui/Layout";
import { GlobalContext } from "@contexts/globalContext";

import { getRecaptcha } from "@components/ReCaptcha";
import { emailValidator, mobileNumberValidator } from "@utils/validator";

import { postForm, PHONE_RES_PWD, EMAIL_RES_PWD } from "@utils/api";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

import classes from "../page.module.scss";

export default function ForgotProcessor() {
  //
  const router = useRouter();

  const { setIsLoading } = useContext(GlobalContext);
  const [forgot, setForgot] = useState("");

  const forgotBtn = async () => {
    //
    if (!forgot) {
      return HealthModal.alert({
        title: "格式錯誤",
        text: "請輸入E-MAIL或手機號碼",
      });
    }
    setIsLoading(true);

    let gToken = await getRecaptcha();
    if (!gToken) {
      HealthModal.alert({
        title: "Error",
        text: "Google 驗證錯誤",
      });
      setIsLoading(false);
      return;
    }

    switch (true) {
      //
      case mobileNumberValidator(forgot):
        mobileResPwd(forgot, gToken);
        break;
      //
      case emailValidator(forgot):
        emailResPwd(forgot, gToken);
        break;
      //
      default:
        HealthModal.alert({
          title: "格式錯誤",
          text: "請正確輸入E-MAIL或手機號碼",
        });
        break;
    }
  };

  async function emailResPwd(email, g_token) {
    const formData = {
      site: "health",
      g_token,
      email,
    };
    const { data } = await postForm(basePath + EMAIL_RES_PWD, formData);

    if (data.status === "200") {
      HealthModal.alert({
        title: "用戶中心",
        text: "請至註冊的電子信箱中開啟[重設密碼通知函]",
        callback() {
          router.push("/login?action=login");
        },
      });
    } else {
      HealthModal.alert({
        title: data.status,
        text: data.message,
      });
    }

    return setIsLoading(false);
  }

  async function mobileResPwd(mobile, g_token) {
    const formData = {
      site: "health",
      g_token,
      mobile,
    };
    const { data } = await postForm(basePath + PHONE_RES_PWD, formData);
    //
    if (data.status === "200") {
      //
      // let newVerifyData = {
      //   mobile,
      //   resndpwdno: data.resndpwdno,
      // };
      // setVerifyData((preVerifyData) => ({  // useContext in original code, & to be continued
      //   ...preVerifyData,
      //   ...newVerifyData,
      // }));

      HealthModal.alert({
        title: "用戶中心",
        text: "已發送認證碼至您的手機號碼",
        callback() {
          navigate({
            pathname: "/verify",
            search: "type=forgotMobile",
          });
        },
      });

      //
    } else {
      HealthModal.alert({
        title: data.status,
        text: data.message,
      });
    }

    setIsLoading(false);
  }

  //
  return (
    <>
      <div className={classes.forgot__input}>
        <input
          required
          type="text"
          value={forgot}
          variant="flushed"
          onChange={(e) => setForgot(e.target.value.trim())}
        />
        <span>E-MAIL或台灣手機號碼</span>
      </div>

      <Btn className={classes.forgot__button} onClick={forgotBtn}>
        確認送出
      </Btn>
    </>
  );
}
