"use client";

import { getRecaptcha } from "@components/ReCaptcha";
import { loginDomain, postForm } from "@utils/api.js";

import React, { useEffect, useState } from "react";

export default function Form() {
  //
  async function queryMemberData() {
    //
    let gToken = await getRecaptcha();
    console.log(gToken);

    if (!gToken) return console.log("recaptcha failed");

    const formData = {
      //1.
      site: "health",
      email: "linyi.ko@udngroup.com", //linyi.ko@udngroup.com //dodowu@naver.com
      ignore_wait: "Y",
      //2.
      //g_token: gToken,
    };

    try {
      const { data } = await postForm(
        //1.
        loginDomain + "/do/member/wbs/MemberDataQuery", //ok

        //2.
        //loginDomain + "/do/health/api/member/query",	//fail
        formData
      );
      console.log("queryMember data: ", data);
    } catch (error) {
      console.error("queryMember error: ", error);
    }
  }

  return (
    <div>
      <h1>Form</h1>
      <button onClick={queryMemberData}>query</button>
    </div>
  );
}
