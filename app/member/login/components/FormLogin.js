"use client";

import Link from "next/link";
import { BASE_PATH } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import { parse, stringify } from "querystring";
import cookies from "js-cookie";

import { useState } from "react";
import classes from "../page.module.scss";

import { Btn, CheckboxInput, TextInput } from "@components/ui/Layout";
import Form3rdParty from "./Form3rdParty";

import { postForm, getData } from "@utils/api";
import { redirectHandler } from "@utils/helper";
import { emailValidator, mobileNumberValidator } from "@utils/validator";

import { getRecaptcha } from "@components/ReCaptcha";

import { gql, useLazyQuery, useMutation } from "@apollo/client";
import {
  getTeachifyUserSyntax,
  getHasAccessToCourseSyntax,
  registerTeachifyUserSyntax,
} from "@utils/graphqlSyntax";

//
export default function FormLogin() {
  //
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  //
  const [rememberAcc, setRememberAcc] = useState(false);
  const [pw, setPw] = useState("");
  const [acc, setAcc] = useState("");

  //
  const [getTeachifyUser] = useMutation(getTeachifyUserSyntax);
  const getTeachifyUserData = async (userData) => {
    const { data } = await getTeachifyUser({
      variables: {
        auth: {
          email: userData.email,
          password: userData.hash,
        },
        subdomain: "udnhealth",
      },
    });
    console.log("getTeachifyUserData: ", data);
    return data;
  };

  const [registerTeachifyUser] = useMutation(registerTeachifyUserSyntax);
  const registerTeachifyUserData = async (memberData, userData) => {
    try {
      const { data } = await registerTeachifyUser({
        variables: {
          auth: {
            name: memberData.account,
            email: userData.email,
            password: userData.hash,
            passwordConfirmation: userData.hash,
            tos: true,
          },
          subdomain: "udnhealth",
        },
      });

      return data;
    } catch ({ graphQLErrors }) {
      return {
        signUp: {
          token: false,
          user: false,
        },
      };
    }
  };

  const [getHasAccessToCourse] = useLazyQuery(getHasAccessToCourseSyntax, {
    onCompleted: ({ course }) => {
      console.log("getCourseDataSyntax", course);
      //
      if (course?.courseType === "paid" && !course?.isPurchased) {
        //return navigate(`/member/payment?id=${course.slug}&type=course`)
        return redirectHandler(
          encodeURIComponent(
            `${window.location.origin}/member/payment?id=${course.slug}&type=course`
          )
        );
      } else {
        return redirectHandler(redirect);
      }
    },
    onError: (err) => {
      //console.log(err)
      return redirectHandler(redirect);
    },
  });

  //
  async function proceedToLoginWithTeachify(data, redirect) {
    try {
      const teachifyToken = await teachifyLogin(data); //to be continued

      //
      if (!teachifyToken) throw new Error("teachifyToken is null");

      // console.log("data", data);
      // console.log("teachifyToken", teachifyToken);
      // return console.log("to be continued");

      const nextPage = decodeURIComponent(redirect).toString();
      if (!nextPage.includes("/course/")) {
        redirectHandler(redirect);
      } else {
        const slug = nextPage.split("/").pop().split("?")[0];

        getHasAccessToCourse({
          variables: {
            subdomain: "udnhealth",
            slug,
          },
          context: {
            headers: {
              authorization: `Bearer ${teachifyToken}`,
            },
          },
        });
      }
    } catch (e) {
      return HealthModal.alert({
        title: "登入失敗",
        text: "請稍後再試" + e.message,
        options: {
          maskCallback: true,
          closeCallback: true,
        },
        callback: () => {
          setIsLoading(false);
        },
      });
    }
  }

  async function teachifyLogin(memberData) {
    const teachifyAuthData = await getTeachifyLoginData(memberData);

    if (!teachifyAuthData) {
      return; //setIsLoading(false)  //?
    }

    //to be continued [p]
    const teachifyToken = await getTeachifyUserToken(
      memberData,
      teachifyAuthData
    );

    if (teachifyToken) {
      localStorage.setItem("teachify_token", teachifyToken);
    }

    return teachifyToken;
  }

  async function getTeachifyLoginData() {
    //
    let url = "/api/member/teachify";
    // process.env.NODE_ENV === 'development'
    //   ? `${TEACHIFY_AUTH}?account=${memberData.account}`   //memberData 來自 func 參數
    //   : TEACHIFY_AUTH //--> /api/member/teachify   //to be continued

    const res = await getData(url, { auth: true });
    const { data } = res;
    window.authData = res;

    console.log("getTeachifyLoginData: ", data);

    if (data.status === "404") {
      console.log(data.status);
      HealthModal.alert({
        title: "", //data.status
        text: data.message,
      });
      return false;
    } else {
      return data;
    }
  }

  async function getTeachifyUserToken(memberData, userAuthData) {
    try {
      //
      const data = await getTeachifyUserData(userAuthData);
      const { logIn } = data;
      //console.log("--- getTeachifyUserData --- \n", data, "\n", logIn);

      //
      let teachifyUserObj = {
        teachify: logIn.user.email,
        udn: cookies.get("udnmember") || cookies.get("udnland"),
      };
      localStorage.setItem("teachify_user", JSON.stringify(teachifyUserObj));

      //
      const now = new Date();
      const yearLater = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
      document.cookie = `custom_teachify_user_id=${
        logIn.user.id
      }; expires=${yearLater.toUTCString()}; path=/`;

      //
      return logIn.token;
      //
    } catch ({ graphQLErrors }) {
      const { code, message } = graphQLErrors[0];

      // 006 才是沒註冊過，所以就幫他註冊
      if (code !== "User-006" && code !== "User-004") return false;

      const { signUp } = await registerTeachifyUserData(
        memberData,
        userAuthData
      );
      let teachifyUserObj = {
        teachify: signUp.user?.email || "",
        udn: cookies.get("udnmember") || cookies.get("udnland"),
      };
      localStorage.setItem("teachify_user", JSON.stringify(teachifyUserObj));

      return signUp.token;
    }
  }

  //
  async function handleLogin() {
    //
    if (!acc || !pw) {
      return HealthModal.alert({
        title: "錯誤",
        text: "請輸入帳號密碼",
      });
    }

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

    let data = null;
    try {
      const { data: feedbackData } = await postForm(
        handler.address, //交給 proxy 處理 CORS
        formData
      );
      console.log("login data: ", feedbackData);
      data = feedbackData;
    } catch (error) {
      console.error("login error: ", error);
    }

    if (!data) {
      HealthModal.alert({
        title: "Error",
        text: "Network error 網際網路錯誤",
      });
    }

    if (data.status !== "200") {
      if (data.status === "L14") {
        // account not activated,  redirect back to sms confirmation page
        //
        HealthModal.alert({
          title: data.status,
          text: data.message,
          callback: async () => {
            const gToken = await getRecaptcha();
            let resendFormData = {
              mobile: formData.mobile,
              site: "health",
              g_token: gToken,
            };

            const { data: resendData } = await postForm(
              "/do/member/wbs/MemberMobileSendConfirm", //PHONE_CodeResend,
              resendFormData
            );

            if (resendData.status !== "200") {
              HealthModal.alert({
                title: "錯誤",
                text: resendData.message,
              });
              return; //setIsLoading(false)
            }

            // let newVerifyData = {      //// Verify again
            //   mobile: formData.mobile
            // }
            // setVerifyData((preVerifyData) => ({
            //   ...preVerifyData,
            //   ...newVerifyData
            // }))

            // const searchPara = { ...parse(search), type: 'sms' }
            // navigate({
            //   pathname: '/verify',
            //   search: `?${stringify(searchPara)}`
            // })
          },
        });
        return; //setIsLoading(false);
      }

      let errorData = {
        L04: "該EMAIL尚未註冊過",
        L07: "該手機號碼尚未註冊過",
      };

      HealthModal.alert({
        title: data.status,
        text: errorData[data.status] ?? data.message,
      });
      return; //setIsLoading(false);
    }

    //處理 teachify 邏輯
    return proceedToLoginWithTeachify(data, redirect); //to be continued

    //先以 跳轉 profile 頁面替代
    //router.push("/user/profile");
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
          <Link href={BASE_PATH + "/order"}>忘記密碼</Link>
          <Link href={BASE_PATH + "/orders"}>重寄啟用信</Link>
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
