"use client";

import React, { useState, useRef } from "react";
import "lazysizes";

import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("zh-tw");

import classes from "../page.module.scss";

export default function Card({ order }) {
  //
  const orderDetail = useRef(null);
  const [isActived, setIsActived] = useState(false);

  function categoryType(format) {
    if (format == "b2b") {
      return "三聯式";
    }
    if (format == "b2c") {
      return "二聯式";
    }
  }

  function paymentMethod(method) {
    if (method == "credit") {
      return "信用卡";
    }
  }

  //
  return (
    <div className={`${classes.order} ${isActived && classes.active}`}>
      <div className={`${classes["order__header"]}`}>
        <time className={`${classes["order__titme"]}`}>
          訂單成立時間：
          {dayjs(order.createdAt * 1000).format("YYYY/MM/DD")}
        </time>
        <span className={`${classes["order__method"]}`}>
          {paymentMethod(order.paymentType)}
        </span>
      </div>
      <div className={`${classes["order__preview"]}`}>
        <img
          // data-src="https://udnhealth.kaik.io/assets/courses/course-cover-5269a95d1c98921f8eb785a9a95cfe36210860ce03f2fd0ef67c4db1557a79b8.jpg"
          data-src={order.itemImage}
          alt=""
          className={`${classes["order__image"]} ${"lazyload"}`}
        />
        <div>
          <a
            href={
              order.itemType === "Course"
                ? "/service/course/" + order.itemSlug
                : "/service/session/" + order.itemSlug
            }
            className={`${classes["order__title"]}`}
          >
            {order.itemName}
          </a>
          <p className={`${classes["order__price"]}`}>
            NT ${order.paymentsAmount}
          </p>
        </div>
      </div>
      <div className={`${classes["order__detail"]}`} ref={orderDetail}>
        <dl className={`${classes["order__row"]}`}>
          <dt>
            <b>明細</b>
          </dt>
        </dl>
        <dl className={`${classes["order__row"]}`}>
          <dt>課程名稱</dt>
          <dd>{order.itemName}</dd>
        </dl>
        {/* <dl className="order__row">
								<dt>購買方案</dt>
								<dd>單堂購買</dd>
							</dl>*/}
        <dl className={`${classes["order__row"]}`}>
          <dt>訂單編號</dt>
          <dd style={{ wordBreak: "break-all" }}>{order.tradeNo}</dd>
        </dl>
        <dl className={`${classes["order__row"]}`}>
          <dt>實付金額</dt>
          <dd>NT ${order.paymentsAmount}</dd>
        </dl>
        <br />
        <dl className={`${classes["order__row"]}`}>
          <dt>
            <b>發票資訊</b>
          </dt>
          <dd></dd>
        </dl>
        {order.donation ? (
          <div>
            <dl className={`${classes["order__row"]}`}>
              <dt>捐贈發票</dt>
              <dd>{order.loveCode}</dd>
            </dl>
          </div>
        ) : (
          <div>
            <dl className={`${classes["order__row"]}`}>
              <dt>發票號碼</dt>
              <dd>{order.number}</dd>
            </dl>
          </div>
        )}
        <dl className={`${classes["order__row"]}`}>
          <dt>開立日期</dt>
          <dd>{dayjs(order.paidAt * 1000).format("YYYY-MM-DD")}</dd>
        </dl>
        <dl className={`${classes["order__row"]}`}>
          <dt>發票類型</dt>
          <dd>{categoryType(order.category)}</dd>
        </dl>
        {order.category === "b2b" ? (
          <div>
            <dl className={`${classes["order__row"]}`}>
              <dt>統一編號</dt>
              <dd>{order.buyerUbn}</dd>
            </dl>
            <dl className={`${classes["order__row"]}`}>
              <dt>發票抬頭</dt>
              <dd>{order.buyerName}</dd>
            </dl>
          </div>
        ) : (
          ""
        )}
      </div>
      <button
        className={`${classes["order__btn"]}`}
        onClick={(e) => {
          e.preventDefault();
          setIsActived(!isActived);
        }}
      >
        <i className={`i-arrow5-up`}></i>
      </button>
    </div>
  );
}
