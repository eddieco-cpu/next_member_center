"use client";

import { Link } from "next/link";

import { useState } from "react";
import classes from "../page.module.scss";

import { Btn, CheckboxInput, TextInput } from "@components/ui/Layout";
import Form3rdParty from "./Form3rdParty";

export default function FormRegister() {
  //
  const [agreeContract, setAgreeContract] = useState(true);
  const [accReg, setAccReg] = useState("");
  const [pwReg, setPwReg] = useState("");
  const [pwRegSec, setPwRegSec] = useState("");

  return (
    <>
      <TextInput className={`${classes.login__input}`}>
        <input
          onChange={(e) => setAccReg(e.target.value)}
          required
          type="text"
          value={accReg}
        />
        <span>電子信箱或台灣手機號碼</span>
      </TextInput>
      <TextInput className={`${classes.login__input}`}>
        <input
          onChange={(e) => setPwReg(e.target.value)}
          required
          type="password"
          value={pwReg}
        />
        <span>密碼</span>
      </TextInput>
      <TextInput className={`${classes.login__input}`}>
        <input
          onChange={(e) => setPwRegSec(e.target.value)}
          required
          type="password"
          value={pwRegSec}
        />
        <span>再次輸入密碼</span>
      </TextInput>
      <div className={`${classes.login__button__wrapper}`}>
        <Btn
          className={`${classes.login__button} ${classes["login__button--default"]}`}
        >
          確認，註冊
        </Btn>
        <Form3rdParty />

        <CheckboxInput>
          <input
            type="checkbox"
            id="agreeContract"
            checked={agreeContract}
            onChange={() => setAgreeContract(!agreeContract)}
          />
          <label
            className={`${classes.login__agreement}`}
            htmlFor="agreeContract"
          >
            <span>加入代表您同意</span>
            <a href="https://member.udn.com/member/rule.jsp" className="space">
              會員服務條款
            </a>
            <span>與</span>
            <a
              href="https://www.udngroup.com/members/udn_privacy"
              className="space"
            >
              隱私權聲明
            </a>
            <span>，並願意訂閱</span>
            <span className="space">udn.com</span>
            <span>發出的市場相關訊息。</span>
          </label>
        </CheckboxInput>
      </div>
    </>
  );
}
