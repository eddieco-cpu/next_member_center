"use client";

import cookies from "js-cookie";

import { getRecaptcha } from "@components/ReCaptcha";
import { postForm } from "@utils/api";

import { TextInput, Btn } from "@components/ui/Layout";
import { taiwanAreaData } from "@/utils/address.js";

import React, { useEffect, useState } from "react";

import classes from "../page.module.scss";

let thirdparty = [
  {
    id: "facebook",
    depandcy: "facebook_bind",
    img: "/fb2.svg",
  },
  {
    id: "google",
    depandcy: "google_bind",
    img: "/google2.svg",
  },
  {
    id: "apple",
    depandcy: "apple_bind",
    img: "/apple2.svg",
  },
];

async function queryMemberData() {
  //
  const udnmember = cookies.get("udnmember");
  if (!udnmember) return alert("no udnmember");

  let gToken = await getRecaptcha();
  if (!gToken) return alert("recaptcha failed");

  const formData = {
    //1.
    site: "health",
    account: udnmember,
    ignore_wait: "Y",
    //2.
    //g_token: gToken,
  };

  try {
    const { data } = await postForm(
      //1.
      "/do/member/wbs/MemberDataQuery", //ok
      //2.
      //loginDomain + "/do/health/api/member/query",	//fail
      formData
    );
    console.log("queryMember data: ", data);
    return data;
  } catch (error) {
    console.error("queryMember error: ", error);
    return { memberdata: {} };
  }
}

function VerifyEmblem(props) {
  return (
    <div className={`${classes["row--verify-state"]}`}>
      <img src={props.condition ? "/is_bind.svg" : "/no_bind.svg"} />
      <b
        style={{
          color: props.condition ? "#218431" : "#666",
        }}
      >
        {props.condition ? "已驗證" : "未驗證"}
      </b>
    </div>
  );
}

function getZipArr() {
  let zipArr = [];
  for (let areaKey in taiwanAreaData) {
    for (let zipKey in taiwanAreaData[areaKey]) {
      zipArr.push({
        id: encodeURIComponent(areaKey + zipKey),
        des: taiwanAreaData[areaKey][zipKey] + areaKey + zipKey,
        zip: taiwanAreaData[areaKey][zipKey],
      });
    }
  }
  return zipArr;
}

export default function DataForm() {
  //
  const [postcodeArr] = useState([
    { id: 1000, des: "請選擇郵遞區號", zip: 1000 },
    ...getZipArr(),
  ]);
  const [postcodeVal, setPostcodeVal] = useState("請選擇郵遞區號");
  const [postcodeSwitcher, setPostcodeSwitcher] = useState(false);

  const [userData, setUserData] = useState({});

  //
  useEffect(() => {
    async function doQueryMemberData() {
      //
      let apiUserData = null;
      try {
        let { memberdata } = await queryMemberData();
        apiUserData = { ...memberdata };
        var {
          communitydata: { nickname },
        } = apiUserData;

        setUserData({
          ...apiUserData,
          nickname: nickname
            ? nickname
            : apiUserData
            ? apiUserData.account
            : "",
        });
      } catch (error) {
        console.error("queryMember error: ", error);
        return;
      }
    }
    doQueryMemberData();
  }, []);

  //
  function selectPostcode(el) {
    setPostcodeVal(el.des);
    // setUserData((obj) => {
    //   return { ...obj, zip: el.zip * 1 !== 1000 ? el.zip : '' }
    // })
    setPostcodeSwitcher(!postcodeSwitcher);
  }

  //
  return (
    <section className={classes.profile__wrapper}>
      <div className={`${classes.row} ${classes.row_mail}`}>
        <TextInput>
          <input
            name="email"
            id="email"
            type="text"
            placeholder="電子信箱"
            value={userData.email || ""}
            onChange={(e) => console.log(e.target.value)}
          />
          <label htmlFor="email">請輸入您的電子信箱 ＊</label>
        </TextInput>
        <VerifyEmblem
          condition={userData?.emailconfirm && userData?.emailconfirm === "Y"}
        />
      </div>

      <div className={`${classes.row} ${classes.row_phone}`}>
        <TextInput>
          <input
            name="phone"
            id="phone"
            type="text"
            placeholder="台灣手機號碼"
            value={userData.mobile || ""}
            onChange={(e) => console.log(e.target.value)}
          />
          <label htmlFor="phone">請輸入台灣手機號碼 ＊</label>
        </TextInput>
        <VerifyEmblem
          condition={userData?.mobileconfirm && userData?.mobileconfirm === "Y"}
        />
      </div>

      <div className={`${classes.row} ${classes.row_account}`}>
        <TextInput>
          <input
            name="account"
            id="account"
            type="text"
            placeholder="帳號"
            value={userData.account || ""}
            readOnly
          />
          <label htmlFor="account">帳號 ＊</label>
        </TextInput>
      </div>

      <div className={`${classes.row} ${classes["row--sex"]}`}>
        <div className={classes.sex_label}>性別</div>
        <label className={classes.radio_label}>
          女
          <input
            type="radio"
            name="sex"
            value="2"
            checked={userData.sex == 2 ? true : false}
            onChange={() => console.log(2)}
          />
          <span className={classes.checkmark}></span>
        </label>
        <label className={classes.radio_label}>
          男
          <input
            type="radio"
            name="sex"
            value="1"
            checked={userData.sex == 1 ? true : false}
            onChange={() => console.log(1)}
          />
          <span className={classes.checkmark}></span>
        </label>
      </div>

      <div className="row row--birth">
        <p className="birth birth--des">生日</p>
        <TextInput className="birth birth--year">
          <input
            name="year"
            id="year"
            type="number"
            placeholder="年"
            value={Math.floor((userData.birthday * 1) / 10000) || ""}
            max={new Date().getFullYear() - 1}
            min={new Date().getFullYear() - 151}
            onChange={(e) => {
              return arrangeBirth("年", e);
            }}
          />
          <label htmlFor="year">年</label>
        </TextInput>
        <TextInput className="birth birth--month">
          <input
            name="month"
            id="month"
            type="number"
            placeholder="月"
            value={Math.floor(((userData.birthday * 1) % 10000) / 100) || ""}
            max={12}
            min={1}
            onChange={(e) => {
              return arrangeBirth("月", e);
            }}
          />
          <label htmlFor="month">月</label>
        </TextInput>
        <TextInput className="birth birth--date">
          <input
            name="date"
            id="date"
            type="number"
            placeholder="日"
            value={Math.floor((userData.birthday * 1) % 100) || ""}
            max={31}
            min={1}
            onChange={(e) => {
              return arrangeBirth("日", e);
            }}
          />
          <label htmlFor="date">日</label>
        </TextInput>
      </div>

      <div className={`${classes.row} ${classes["row--postcode"]}`}>
        <b className={`${classes.postcode_label}`}>郵遞區號</b>
        <p
          className={
            postcodeVal !== "請選擇郵遞區號"
              ? `${classes.postcode_selected} ${classes["postcode_selected-done"]}`
              : `${classes.postcode_selected}`
          }
          onClick={() => setPostcodeSwitcher(!postcodeSwitcher)}
        >
          {postcodeVal}
        </p>
        <ul
          className={
            postcodeSwitcher
              ? `${classes.postcode_group} ${classes["postcode_group-active"]}`
              : `${classes.postcode_group}`
          }
        >
          {postcodeArr.map((el) => (
            <li
              className={`${classes.postcode_item}`}
              key={el.id}
              onClick={() => selectPostcode(el)}
            >
              {el.des}
            </li>
          ))}
        </ul>
        <div
          className={
            postcodeSwitcher
              ? `${classes["postcode_group--bg"]} ${classes["postcode_group--bg-active"]}`
              : `${classes["postcode_group--bg"]}`
          }
          onClick={() => setPostcodeSwitcher(!postcodeSwitcher)}
        ></div>
      </div>

      <div className={`${classes.row} ${classes.row_address}`}>
        <TextInput>
          <input
            name="address"
            id="address"
            type="text"
            placeholder="地址"
            value={userData.address || ""}
            // userData.address || ''  (may undefined, so React err)
            onChange={(e) => {
              return arrangeAddress(e);
            }}
          />
          <label htmlFor="address">地址</label>
        </TextInput>
      </div>

      <div className={`${classes.row} ${classes.row_disclaimer}`}>
        <p
        // onClick={() => {return log('userData', userData)}}
        >
          您所填寫的會員資料，聯合報系均遵守「個人資料保護法」予以保障。(
          ＊為必填)
        </p>
      </div>

      <Btn className={`${classes.profile__sender}`}>確認送出</Btn>

      <div className={`${classes.row} ${classes["row--linker"]}`}>
        {thirdparty.map((el) => (
          <div className={`${classes.linker_item}`} key={el.id}>
            <b
              className={`${classes.linker_icon} ${
                classes[`linker_icon--${el.id}`]
              }`}
            >
              <img src={el.img} />
            </b>
            <button
              className={`${classes.linker_button} ${
                userData[el.depandcy] === "Y"
                  ? ""
                  : `${classes["linker_button--no-use"]}`
              }`}
              onClick={() =>
                unbind3rdP(userData[el.depandcy] === "Y" ? true : false, el.id)
              }
            >
              {userData[el.depandcy] === "Y" ? "解除綁定" : "未綁定"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
