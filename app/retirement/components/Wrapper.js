"use client";

import React, { useEffect, useState } from "react";

import Statistic from "./Statistic";
import FeedbackMain from "./FeedbackMain";

import classes from "../page.module.scss";

function convertStringToObject(str) {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (error) {
    console.error("cannot switch str to obj: ", error);
    return null;
  }
}

function convert5PointsObj(obj) {
  //
  let points = {};

  Object.keys(obj).forEach((key) => {
    switch (true) {
      case key.toLowerCase().includes("social"):
        points.social = obj[key];
        break;
      case key.toLowerCase().includes("mental"):
        points.mental = obj[key];
        break;
      case key.toLowerCase().includes("health"):
        points.health = obj[key];
        break;
      case key.toLowerCase().includes("finance"):
        points.finance = obj[key];
        break;
      case key.toLowerCase().includes("recognition"):
        points.recognition = obj[key];
        break;
      default:
        break;
    }
  });

  return points;
}

const clientDataDepend = {
  created: "",
  date: "_",
  score: "",
  social: "",
  mental: "",
  health: "",
  finance: "",
  recognition: "",
};

export default function Wrapper({
  retireDataObj,
  avgDataObj,
  clientResultDataAndSlopeData,
}) {
  //
  const [slopeDataObj, setSlopeDataObj] = useState(null);
  const [clientDataArr, setClientDataArr] = useState(null);
  const [ClientDataArrDependency] = useState([
    { tid: "1st", ...clientDataDepend },
    { tid: "2nd", ...clientDataDepend },
    { tid: "3rd", ...clientDataDepend },
    { tid: "4th", ...clientDataDepend },
    { tid: "5th", ...clientDataDepend },
    { tid: "6th", ...clientDataDepend },
  ]);
  const [currentClientDataId, setCurrentClientDataId] = useState("1st");

  //
  useEffect(() => {
    //
    if (clientDataArr || slopeDataObj) return;

    const {
      result: resultData,
      slope: slopeData,
    } = clientResultDataAndSlopeData;

    const result = [...resultData].reverse() || [];
    console.log("result", result);
    const slope = slopeData || {
      FinancePoint: 0,
      HealthPoint: 0,
      MentalPoint: 0,
      RecognitionPoint: 0,
      SocialPoint: 0,
      TotalPoint: 0,
    };

    const results = result.map(({ score, created, cluster, params }) => ({
      score,
      created,
      cluster,
      ...convert5PointsObj(convertStringToObject(params)),
      date: created.split(" ")[0],
    }));
    const slopeObj = {
      score: slope.TotalPoint,
      ...convert5PointsObj(slope),
    };
    const xResults = ClientDataArrDependency.map((obj, i) =>
      results[i] ? { ...obj, ...results[i] } : obj
    );

    setClientDataArr([...xResults]);
    setSlopeDataObj({ ...slopeObj });
    //
  }, [clientDataArr, slopeDataObj]);

  //
  // useEffect(() => {
  //   //
  //   if (!retireDataObj || !clientDataArr || !avgDataObj || !slopeDataObj)
  //     return;

  //   console.log(
  //     "retireDataObj, avgDataObj, clientDataArr, slopeDataObj",
  //     "\n",
  //     retireDataObj,
  //     "\n",
  //     avgDataObj,
  //     "\n",
  //     clientDataArr,
  //     "\n",
  //     slopeDataObj,
  //     "\n"
  //   );
  // }, [retireDataObj, clientDataArr, avgDataObj, slopeDataObj]);

  //
  return (
    <div className={classes.retirement__container}>
      <Statistic
        {...{
          retireDataObj,
          currentClientDataId,
          clientDataArr,
          slopeDataObj,
          setCurrentClientDataId,
        }}
      />
      <FeedbackMain
        {...{ retireDataObj }}
        {...{ currentClientDataId }}
        {...{ clientDataArr }}
        {...{ avgDataObj: avgDataObj.result }}
      />
    </div>
  );
}
