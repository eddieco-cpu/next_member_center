"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";

import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

import classes from "./feedbackChart.module.scss";

export default function FeedbackMain({
  retireDataObj,
  avgDataObj,
  clientDataArr,
  currentClientDataId,
}) {
  //
  const radarChartRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [corePoints] = useState([
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
  const [coreData, setCoreData] = useState([
    {
      id: "social",
      subject: "社會連結",
      clientPoint: 0,
      averagePoint: 0,
      S: 100,
    },
    {
      id: "mental",
      subject: "活躍好學",
      clientPoint: 0,
      averagePoint: 0,
      S: 100,
    },
    {
      id: "health",
      subject: "健康",
      clientPoint: 0,
      averagePoint: 0,
      S: 100,
    },
    {
      id: "finance",
      subject: "財務",
      clientPoint: 0,
      averagePoint: 0,
      S: 100,
    },
    {
      id: "recognition",
      subject: "自在獨立",
      clientPoint: 0,
      averagePoint: 0,
      S: 100,
    },
  ]);
  const currentClientData = useMemo(() => {
    if (!clientDataArr || !currentClientDataId) return;
    return clientDataArr.find((item) => item.tid === currentClientDataId);
  }, [clientDataArr, currentClientDataId]);

  const [
    currentClientDataMinValueKeys,
    setCurrentClientDataMinValueKeys,
  ] = useState([]);

  useEffect(() => {
    //console.log('radarChartRef', radarChartRef.current)
    const targetElement = radarChartRef.current;

    // 创建Intersection Observer
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          //
          if (entry.isIntersecting) {
            // 当目标元进入视口

            //
            //targetElement.style.outline = '1px solid yellowgreen'
            setIsIntersecting((e) => true);

            // 停止观察
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "-30% 0px -30% 0px", //將判斷區域縮現至視窗的上下30%範圍內
        threshold: [0],
      }
    );

    // 开始观察目标元素
    observer.observe(targetElement);
  }, []);

  useEffect(() => {
    if (!isIntersecting || !currentClientData || !avgDataObj) return;

    //console.log('--- useEffect currentClientData ---')

    const averagePoints = Object.keys(avgDataObj.avg_points).reduce(
      (acc, key) => {
        const newKey = key.split("_")[1];
        acc[newKey] = avgDataObj.avg_points[key];
        return acc;
      },
      {}
    );

    setCoreData((arr) =>
      arr.map((item) => ({
        ...item,
        clientPoint: Math.round(currentClientData[item.id] * 1),
        averagePoint: averagePoints[item.id],
      }))
    );
  }, [isIntersecting, currentClientData, avgDataObj]);

  useEffect(() => {
    if (!currentClientData) return;

    //console.log('=== setCurrentClientDataMinValueKeys ===')

    const minValue = Math.min(
      ...[
        currentClientData.social,
        currentClientData.mental,
        currentClientData.health,
        currentClientData.finance,
        currentClientData.recognition,
      ]
    );

    const MinValueKeys = Object.keys(currentClientData).filter(
      (key) => currentClientData[key] === minValue
    );

    setCurrentClientDataMinValueKeys(MinValueKeys);
  }, [currentClientData]);

  // useEffect(() => {
  //   console.log('=== currentClientDataMinValueKeys ===')
  //   console.log(currentClientDataMinValueKeys)
  // }, [currentClientDataMinValueKeys])

  //
  const CustomizedLabel = (props) => {
    //console.log('props', props)
    const { x, y, value, index } = props;

    return (
      <svg x={x - 30} y={y - 30} height="60" width="60" fill="#218431">
        <rect width="100%" height="100%" fill="rgba(0, 0, 0, 0)" />
        <text
          x={index === 0 ? "50%" : index === 1 || index === 2 ? "75%" : "25%"}
          y={index === 0 ? "25%" : index === 1 || index === 4 ? "40%" : "77.5%"}
          // x="50%"
          // y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#e51c23"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
        >
          {value}
        </text>
      </svg>
    );
  };

  //
  return (
    <div>
      <div className={classes.result_down}>
        <div className={classes.upString}>
          5項核心能力中，
          <br />
          你的{" "}
          {currentClientData &&
          currentClientDataMinValueKeys &&
          retireDataObj?.core_points
            ? currentClientDataMinValueKeys.map((el, i) => (
                <span key={el}>
                  {retireDataObj.core_points.find((pt) => pt.id === el)?.name}
                  {i < currentClientDataMinValueKeys.length - 1 && "、"}
                </span>
              ))
            : ""}{" "}
          準備最不足
        </div>
        <div>
          <div>
            <div className={classes["chartjs-size-monitor"]}>
              <div className={classes["chartjs-size-monitor-expand"]}>
                <div></div>
              </div>
              <div className={classes["chartjs-size-monitor-shrink"]}>
                <div></div>
              </div>
            </div>

            <div className={classes["radar-chart_wrapper"]} ref={radarChartRef}>
              {/* --- */}
              <RadarChart
                cx={440 / 2}
                cy={440 / 2 - 40}
                outerRadius={150}
                width={440}
                height={440}
                data={coreData}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis
                  angle={90}
                  tickCount={6}
                  stroke="rgba(0,0,0,0)"
                />
                <Radar
                  name=""
                  dataKey="S"
                  stroke="rgba(0, 0, 0, 0.05)"
                  fill="#ddd"
                  fillOpacity={0}
                />
                <Radar
                  name="average"
                  dataKey="averagePoint"
                  stroke="#19a4b8"
                  strokeWidth={2}
                  fill="#19a4b8"
                  fillOpacity={0.15}
                />
                <Radar
                  name="client"
                  dataKey="clientPoint"
                  stroke="#ff9d9d"
                  strokeWidth={2}
                  fill="#ff9d9d"
                  fillOpacity={0.3}
                  label={isIntersecting ? <CustomizedLabel /> : false}
                />
              </RadarChart>
              {/* --- */}

              <p
                className={
                  classes["radar-chart_note"] + " " + classes["note--left"]
                }
              >
                你的分數
              </p>
              <p
                className={
                  classes["radar-chart_note"] + " " + classes["note--right"]
                }
              >
                整體平均分數
              </p>
            </div>
          </div>
        </div>
        <div className={classes.downString}>
          {currentClientData &&
          currentClientDataMinValueKeys &&
          retireDataObj?.core_points
            ? currentClientDataMinValueKeys.map((el) => (
                <p
                  key={el}
                  dangerouslySetInnerHTML={{
                    __html: retireDataObj.core_points.find((pt) => pt.id === el)
                      ?.article,
                  }}
                />
              ))
            : ""}{" "}
        </div>

        <div className={classes.downString_research}>
          <div className={classes.pargraphic}>
            <div className={classes.downString_research_title}>
              <b>計分：</b>
            </div>
            指標計分總分100分，財務與健康各占30分，社會連結、活躍好學、自在獨立共占30分，以上皆得15分以上者，加5分；皆得20分，再加10分。
            <div className={classes.space}></div>
          </div>
          <div className={classes.pargraphic}>
            <div className={classes.downString_research_title}>
              <b>研究方法：</b>
            </div>
            聯合報退休準備工程自2019年開始籌備進行，2020年12月推出「退休準備指標1.0」，在
            政大教授王儷玲、台灣人口學會監事林佳瑩、政治大學商學院教授別蓮蒂、陽明大學教授陳亮恭專家指導下，與典通公司合作，以24名34歲至74歲，職業包括藍領、白領與公教人員等民眾為對象，透過撰寫日記與深度訪談，萃取出已退休者的提醒及準備，還有未退休者的期待，經腦力激盪、專家修正後建立。
            <div className={classes.space}></div>
            2020年12月推出「六種動物,來測你的退休力」，以「退休準備指標1.0」為基礎，邀請高齡醫學權威陳亮恭與宏碁智醫團隊，於2021年5月收集26859人的填答結果為基礎，利用人工智慧演算，將填答者的退休準備樣態分為六群，對照六種代表動物，不只協助算出總分，更考量退休五核心能力，即財務、健康、社會連結、活躍好學與自在獨立的個別準備程度不同，提供個人評量退休準備的優勢與不足。
          </div>
        </div>
      </div>
    </div>
  );
}
