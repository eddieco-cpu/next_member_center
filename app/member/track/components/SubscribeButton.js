"use client";

import React from "react";
import { postData, postForm } from "@utils/api";
import classes from "@track/page.module.scss";

function checkUnSubscribe() {
  return new Promise((resolve) => {
    HealthModal.confirm({
      title: "追蹤專家",
      text: "確定要 '取消' 追蹤嗎？",
      confirmBtnText: "確定",
      cancelBtnText: "返回",
      callback: () => {
        resolve(true);
      },
      cancelCallback: () => {
        resolve(false);
      },
    });
  });
}

export default function SubscribeButton({ track_id, title, setIsSubscribed }) {
  async function unSubscrib() {
    //props need
    if (!track_id || !title)
      return console.error("props.track_id or props.title is undefined");

    //check user mind
    const check = await checkUnSubscribe();
    if (!check) return "continue subscribe";

    //OK, let's do it
    //setIsLoading(true)
    let trackCancellation = "unsure";
    try {
      let {
        data: { state = "unsure" },
      } = await postData(
        "/api/track/switch",
        {
          channel_id: "1005",
          id: track_id,
          title: title,
          type: "author",
          value: false,
        },
        { auth: true }
      );
      trackCancellation = state;
    } catch (error) {
      throw new Error(error);
    }

    if (trackCancellation !== true) {
      return HealthModal.alert({
        title: "更新失敗",
        text: "更新失敗，請稍後再試",
        // callback: () => {
        //   setIsLoading(false)
        // }
      });
    } else {
      return HealthModal.alert({
        title: "更新成功",
        text: "已取消追蹤",
        callback: () => {
          //setIsLoading(false)
          setIsSubscribed(false);
        },
      });
    }
  }

  return (
    <b className={`${classes["subscribe-btn"]}`} onClick={unSubscrib}>
      已追蹤
    </b>
  );
}
