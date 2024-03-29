"use client";

import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { GlobalContext } from "@contexts/globalContext";
import Link from "next/link";
import cookies from "js-cookie";
import classes from "./index.module.scss";

export default function UserDropdown({ isMemberOpen, setIsMemberOpen }) {
  //
  const { logout, setIsLoading } = useContext(GlobalContext);
  const router = useRouter();

  /**
   * While rendering your application, there was a difference between the React tree
   * that was pre-rendered from the server and the React tree that was rendered
   * during the first render in the browser (hydration).
   *
   * Using useEffect to run on the client only
   * Ensure that the component renders the same content server-side as it does during the initial client-side render
   * to prevent a hydration mismatch
   */
  const [isClient, setIsClient] = useState(false); //https://nextjs.org/docs/messages/react-hydration-error

  useEffect(() => {
    setIsClient(true);
  }, []);

  async function handleLogout(e) {
    e.preventDefault();
    const isDidLogout = await logout();
    if (isDidLogout) {
      router.push("/login?action=login");
    }
    setIsLoading(false);
    setIsMemberOpen(false);
  }

  //
  if (!isClient) {
    return null;
  } else {
    return (
      <div
        className={`${classes.member__wrapper} ${
          isMemberOpen ? classes.show : ""
        }`}
      >
        {cookies.get("udnmember") &&
        cookies.get("udnland") &&
        cookies.get("udngold") &&
        cookies.get("um2") ? (
          <div className={`${classes["member__wrapper--login"]}`}>
            <Link
              className={`${classes["member__wrapper-items"]}`}
              href="/user"
              onClick={() => setIsMemberOpen(false)}
            >
              <span>用戶中心</span>
            </Link>
            <Link
              className={`${classes["member__wrapper-items"]}`}
              href="/forgot"
            >
              <span>修改密碼</span>
            </Link>
            <Link
              className={`${classes["member__wrapper-items"]}`}
              href="/order"
            >
              <span>訂單明細</span>
            </Link>
            <a
              className={`${classes["member__wrapper-items"]}`}
              href="/health/faq"
              target="_blank"
              onClick={() => {
                window.open("/health/faq", "_blank");
              }}
            >
              <span>常見問題</span>
            </a>
            <a
              onClick={(e) => handleLogout(e)}
              className={`${classes["member__wrapper-items"]}`}
              href="#"
            >
              <span>登出</span>
            </a>
          </div>
        ) : (
          <div className={`${classes["member__wrapper--logout"]}`}>
            <Link
              className={`${classes["member__wrapper-items"]}`}
              href="/login?action=login"
              onClick={() => {
                setIsMemberOpen(false);
              }}
            >
              <span>登入/註冊</span>
            </Link>
            <Link
              className={`${classes["member__wrapper-items"]}`}
              href="/forgot"
            >
              <span>忘記密碼</span>
            </Link>

            <a
              onClick={() => {
                window.open("/health/faq", "_blank");
              }}
              className={`${classes["member__wrapper-items"]}`}
              href="#"
            >
              <span>常見問題</span>
            </a>
          </div>
        )}
      </div>
    );
  }
}
