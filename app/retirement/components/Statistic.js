"use client";

import React, { useEffect, useState, useMemo } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import classes from "./components.module.scss";

//window.innerWidth > 740 ? 是版型的切換點

function Statistic({
  clientDataArr,
  currentClientDataId,
  setCurrentClientDataId,
  retireDataObj,
  slopeDataObj,
}) {
  const [windowSize, setWindowSize] = useState(undefined);
  const [corePoints, _] = useState([
    {
      name: "退休準備分數",
      id: "score",
    },
    {
      name: "社會連結",
      id: "social",
    },
    {
      name: "活躍好學",
      id: "mental",
    },
    {
      name: "健康",
      id: "health",
    },
    {
      name: "財務",
      id: "finance",
    },
    {
      name: "自在獨立",
      id: "recognition",
    },
  ]);
  const [currentCorePoint, setCurrentCorePoint] = useState("score");

  useEffect(() => {
    // 確保代碼只在瀏覽器端運行
    if (typeof window !== "undefined") {
      setWindowSize(window.innerWidth);
    }
  }, []);

  useEffect(() => {
    //console.log('cdArr', clientDataArr)
    if (!clientDataArr || !clientDataArr[0].score) return; // 未取得資料 || 資料沒有 score

    const findLastNumber = (arr) => {
      for (let i = arr.length - 1; i >= 0; i--) {
        if (typeof arr[i].score === "number") {
          return arr[i]; // return el with number type
        }
      }
      return null; // if no number type was found
    };

    if (findLastNumber(clientDataArr)) {
      setCurrentClientDataId(findLastNumber(clientDataArr).tid);
    }
  }, [clientDataArr]);

  const currentSlopeData = useMemo(() => {
    //
    if (!slopeDataObj) return null;
    if (!currentCorePoint) return null;
    if (!retireDataObj) return null;

    const slopeNumber = slopeDataObj[currentCorePoint] * 1;
    const slopeKey =
      slopeNumber > 1 ? "increase" : slopeNumber < -1 ? "decrease" : "same";

    const newCurrentCorePoint =
      currentCorePoint === "score" ? "overall" : currentCorePoint;

    const slopeObj = retireDataObj.core_points.find(
      (el) => el.id === newCurrentCorePoint
    ).slope;

    //console.log('currentSlopeData', slopeNumber, slopeKey, slopeObj)

    return {
      title: slopeObj.title[slopeKey],
      content: slopeObj.content[slopeKey],
    };
  }, [slopeDataObj, currentCorePoint, retireDataObj]);

  //on click
  const doSetCurrentClientDataId = (props) => {
    //
    if (!props) return;

    const { activePayload } = props;
    if (!activePayload) return;

    const { payload } = activePayload[0];
    //console.log('payload', payload)

    if (!payload.created) return;
    setCurrentClientDataId(payload.tid);
  };

  const doSetCurrentClientDataIdInMobile = (clientData) => {
    //
    if (!clientData) return;
    if (!clientData.created) return;

    setCurrentClientDataId(clientData.tid);
  };

  //comps
  const CustomizedDot = (props) => {
    const { cx, cy, stroke, payload, value } = props;

    if (payload.tid === currentClientDataId) {
      return (
        <svg x={cx - 12.5} y={cy - 12} height="25" width="25" fill="#41B751">
          <polygon points="12.5,1.25 15.75,7.5 22,7.5 17.25,12 18.75,18.75 12.5,15 6.25,18.75 7.75,12 3,7.5 9.25,7.5" />
        </svg>
      );
    } else {
      return (
        <svg x={cx - 4} y={cy - 4} height="8" width="8" fill="#218431">
          <circle cx="4" cy="4" r="4" />
        </svg>
      );
    }
  };
  const CustomizedActDot = (props) => {
    const { cx, cy, stroke, payload, value } = props;

    if (payload.tid === currentClientDataId) {
      return (
        <svg x={cx - 15} y={cy - 13.5} height="30" width="30" fill="#41B751">
          <polygon points="15,1.5 18.9,9 26.4,9 20.7,14.4 22.5,22.5 15,18 7.5,22.5 9.3,14.4 3.6,9 11.1,9" />
        </svg>
      );
    } else {
      return (
        <svg x={cx - 6} y={cy - 6} height="12" width="12" fill="#218431">
          <circle cx="6" cy="6" r="6" />
        </svg>
      );
    }
  };
  const CustomTooltip = ({ active, payload, label }) => {
    //
    if (window?.innerWidth < 768) return null;

    if (active && payload && payload.length && payload[0].payload?.created) {
      return (
        <div
          className={classes["custom-tooltip"]}
          style={{
            padding: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.3)",
            borderRadius: "5px",
          }}
        >
          <p className="label">{`${payload[0].payload.created}`}</p>
          <p className="intro" style={{ color: "#218431" }}>
            {`
            ${
              corePoints.find((corePoint) => corePoint.id === currentCorePoint)
                .name
            } : 
            ${payload[0].payload[payload[0].dataKey]}
          `}
          </p>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <section className={`${classes["statistic"]}`}>
      <div className={`${classes["statistic__wrapper"]}`}>
        <div className={`${classes["statistic__line-chart__wrapper"]}`}>
          <div className={`${classes["statistic__line-chart__header"]}`}>
            <h2
              className={`${classes["statistic__line-chart__title"]}`}
              onClick={() => console.log("window", window)}
            >
              退休力發展圖
            </h2>
            <select
              className={`${classes["statistic__line-chart__selection"]}`}
              id="core_points"
              value={currentCorePoint}
              onChange={(e) => setCurrentCorePoint(e.target.value)}
            >
              {corePoints.map((corePoint) => (
                <option key={corePoint.id} value={corePoint.id}>
                  {corePoint.name}
                </option>
              ))}
            </select>
          </div>

          <div className={`${classes["statistic__line-chart__container"]}`}>
            <div
              className={`${classes["statistic__line-chart__body-wrapper"]}`}
            >
              <ul
                className={`${classes["statistic__line-chart__body--controller"]}`}
              >
                {clientDataArr &&
                  clientDataArr.length &&
                  clientDataArr.map((clientData) => (
                    <li
                      key={clientData.tid}
                      onClick={() =>
                        doSetCurrentClientDataIdInMobile(clientData)
                      }
                    ></li>
                  ))}
              </ul>
              {/* 660/370 || 594/333 */}
              <ResponsiveContainer
                width={windowSize > 741 ? "92%" : "100%"}
                aspect={66 / 37}
                className={`${classes["statistic__line-chart__body"]}`}
              >
                <LineChart
                  data={clientDataArr}
                  margin={{
                    top: 15,
                    right: windowSize > 741 ? 30 : 15,
                    left: windowSize > 741 ? 20 : 0,
                    bottom: 15,
                  }}
                  onClick={doSetCurrentClientDataId}
                >
                  <CartesianGrid strokeDasharray="0 0" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    padding={{ left: 30, right: 30 }}
                    tickMargin={15}
                    tick={{
                      style: { fontSize: "16px" },
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    ticks={[0, 20, 40, 60, 80, 100]}
                    unit="分"
                    tickMargin={10}
                    tick={{
                      style: { fontSize: "16px" },
                    }}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={<CustomTooltip />}
                  />

                  <Line
                    dataKey={currentCorePoint}
                    stroke="#555"
                    dot={<CustomizedDot />}
                    activeDot={<CustomizedActDot />}
                  />
                  {/* --- */}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <article className={`${classes["statistic__article"]}`}>
          <h3 className={`${classes["statistic__article__title"]}`}>
            關於退休，提醒你
          </h3>
          <p className={`${classes["statistic__article__description"]}`}>
            {currentSlopeData && currentSlopeData.title}
          </p>
          <h3 className={`${classes["statistic__article__title"]}`}>
            好好退休，建議可以這樣做
          </h3>
          <p className={`${classes["statistic__article__description"]}`}>
            {currentSlopeData && currentSlopeData.content}
          </p>
        </article>
      </div>
    </section>
  );
}

export default Statistic;
