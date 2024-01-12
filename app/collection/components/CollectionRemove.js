"use client";

import axios from "axios";
const axiosInstance = axios.create({
  xsrfCookieName: "",
  xsrfHeaderName: "",
  withCredentials: true,
});

import classes from "../page.module.scss";
import React, { useCallback } from "react";

import { COLLECTION_REMOVE_PATH } from "@utils/api";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

async function removeCollection(collectionId) {
  //
  const { data } = await axiosInstance({
    method: "POST",
    url: BASE_PATH + COLLECTION_REMOVE_PATH,
    data: {
      channel_id: 1005,
      id: collectionId,
      type: "article",
      value: false,
    },
  });
  //console.log("removeCollection: ", data);
  return data;
}

export default function CollectionRemove({ collectionId, setIsAppear }) {
  //
  const handleCollectionRemove = useCallback(async (e) => {
    e.preventDefault();
    HealthModal.confirm({
      title: "用戶中心",
      text: "確定要移除收藏嗎？",
      callback: async () => {
        try {
          await removeCollection(collectionId);
          setIsAppear(false);
        } catch (error) {
          console.error("error: ", error);
        }
      },
    });
  }, []);

  return (
    <button
      className={classes.collection__btn}
      onClick={handleCollectionRemove}
    >
      <svg
        className={classes.collection__btn__svg}
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="19.258"
        viewBox="0 0 15 19.258"
      >
        <path
          className={classes.collection__btn__path}
          d="M17,3H7A2.006,2.006,0,0,0,5,5V21l7-3,7,3V5A2.006,2.006,0,0,0,17,3Z"
          transform="translate(-4.5 -2.5)"
        />
      </svg>
    </button>
  );
}
