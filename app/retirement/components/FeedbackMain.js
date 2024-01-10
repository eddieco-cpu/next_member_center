"use client";

import React, { useState, useMemo } from "react";
import classes from "./components.module.scss";

export default function FeedbackMain({
  retireDataObj,
  avgDataObj,
  clientDataArr,
  currentClientDataId,
}) {
  //
  const [allClusters] = useState([
    {
      id: "cluster1",
      name: "翩翩蝴蝶",
    },
    {
      id: "cluster2",
      name: "做自己貓熊",
    },
    {
      id: "cluster3",
      name: "慢慢樹獺",
    },
    {
      id: "cluster4",
      name: "暖男水豚",
    },
    {
      id: "cluster5",
      name: "王者獅子",
    },
    {
      id: "cluster6",
      name: "好奇海豚",
    },
  ]);

  const currentClientClusterId = useMemo(() => {
    //
    if (!currentClientDataId) return;
    if (!clientDataArr) return;

    return clientDataArr?.find((el) => el.tid === currentClientDataId)?.cluster;
  }, [clientDataArr, currentClientDataId]);

  //
  return (
    <div className={classes.res}>
      <div
        style={{
          "--result-bg": `${
            retireDataObj?.clusters?.find(
              (el) => el.id === currentClientClusterId
            )?.bg
          }`,
        }}
        className={classes.result_wrapper}
      >
        <div className={classes.result_title}>
          <h2 className={classes.title}>
            <span>
              {clientDataArr &&
              clientDataArr?.findIndex(
                (el) => el.tid === currentClientDataId
              ) ===
                clientDataArr?.length - 1
                ? "最近一次"
                : clientDataArr?.find((el) => el.tid === currentClientDataId)
                    ?.date}
            </span>
            <span>測驗結果</span>
          </h2>
        </div>
        <div className={classes.result}>
          <div className={classes.result_one}>
            你是
            <div className={classes.className}>
              「
              {
                retireDataObj?.clusters?.find(
                  (el) => el.id === currentClientClusterId
                )?.name
              }
              」
            </div>
            <div className={classes.clusterArticle}>
              {
                retireDataObj?.clusters?.find(
                  (el) => el.id === currentClientClusterId
                )?.article
              }
            </div>
            <div className={classes.classImage}>
              <img
                src={`${
                  (process.env.NODE_ENV === "development"
                    ? "https://health-feg.udn.com"
                    : "") +
                  retireDataObj?.clusters?.find(
                    (el) => el.id === currentClientClusterId
                  )?.photo
                }`}
              />
            </div>
            <div className={classes.resultbutton}>
              <a
                href="/health/retire/quiz"
                className={classes["resultbutton--retry"]}
              >
                <div className={classes["re"] + " " + classes["re--retry"]}>
                  前往檢測
                </div>
              </a>
            </div>
          </div>
          <div className={classes.result_two}>
            <div className={classes.title}>退休準備分數</div>
            <div className={classes.result_point}>
              <div className={classes.yourcircle}>
                <div className={classes.yourscores_title}>你的分數</div>
                <div className={classes.yourscores}>
                  {
                    clientDataArr?.find((el) => el.tid === currentClientDataId)
                      ?.score
                  }
                </div>
              </div>
              <div className={classes.allcircle}>
                <div className={classes.allscores_title}>整體平均</div>
                <div className={classes.allscores}>{avgDataObj?.avg_score}</div>
              </div>
            </div>
            <div className={classes.totaltest}>
              <p>看看其他人是什麼動物</p>
            </div>

            {allClusters.map((item) => (
              <div className={classes.barSection} key={item.id}>
                <div className={classes.barTitle}>{item.name}</div>
                <div className={classes.graph_number}>
                  <div
                    className={`${classes.bar} ${classes[`bar--${item.id}`]} ${
                      currentClientClusterId == item.id.split("cluster")[1]
                        ? classes["bar--active"]
                        : ""
                    }`}
                  >
                    <div
                      className={classes.getpercent}
                      style={{ width: `${avgDataObj?.cluster[item.id]}%` }}
                    ></div>
                  </div>
                  <div className={classes.number}>
                    {`${avgDataObj?.cluster[item.id]}%`}
                  </div>
                </div>
              </div>
            ))}

            <div className={classes.totaltest}>
              <p>
                共<b>{avgDataObj?.total}</b>人完成測驗
              </p>
            </div>
          </div>

          <fieldset className={classes.result_three}>
            <legend className={classes.result_three_title}>
              <div>
                給
                <b>
                  {
                    retireDataObj?.clusters?.find(
                      (el) => el.id === currentClientClusterId
                    )?.name
                  }
                </b>
                的退休準備心法
              </div>
            </legend>
            {retireDataObj?.clusters
              ?.find((el) => el.id === currentClientClusterId)
              ?.links.map((link) => (
                <div
                  className={classes.result_three_link}
                  key={link.title + link.url}
                >
                  <a href={link.url} target="_blank" rel="noreferrer noopener">
                    <div className={classes.result_three_link_icon}>
                      <i>➜</i>
                    </div>
                    <div className={classes.result_three_link_title}>
                      {link.title}
                    </div>
                  </a>
                </div>
              ))}
          </fieldset>
        </div>
      </div>
    </div>
  );
}
