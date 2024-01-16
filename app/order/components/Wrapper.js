"use client";

import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import classes from "../page.module.scss";

import { getOrderListSyntax } from "@utils/graphqlSyntax";
import Card from "./Card";

export default function Wrapper() {
  //
  const [orderList, setOrderList] = useState([]);
  const [getOrderList] = useLazyQuery(getOrderListSyntax, {
    onCompleted: ({ payments }) => {
      console.log("payments ===>", payments);
      const newPayments = payments.map((el) => ({
        invoicesId: el.invoice?.id,
        number: el.invoice?.number,
        category: el.invoice?.category,
        buyerUbn: el.invoice?.buyerUbn,
        buyerName: el.invoice?.buyerName,
        // carrierNum: el.groupBuying?.initiator?.invoiceOption?.carrierNum,
        // carrierType: el.groupBuying?.initiator?.invoiceOption?.carrierType,
        // companyName: el.groupBuying?.initiator?.invoiceOption?.companyName,
        donation: el.invoice?.donation,
        loveCode: el.invoice?.loveCode,
        paymentsId: el.id,
        paymentsAmount: el.amount,
        paymentType: el.paymentType,
        paymentState: el.paymentState,
        createdAt: el.createdAt,
        tradeNo: el.tradeNo,
        paidAt: el.paidAt,
        itemId: el.lineitems[0]?.itemId,
        itemSlug: el.lineitems[0]?.itemSlug,
        itemName: el.lineitems[0]?.itemName,
        itemType: el.lineitems[0]?.itemType,
        itemImage: el.lineitems[0]?.itemImage,
        lineitemsAmount: el.lineitems[0]?.amount,
      }));

      setOrderList([...newPayments]);
    },
    onError: (err) => {
      HealthModal.alert({
        title: "系統錯誤",
        text: "驗證錯誤，請重新登入",
        callback: () => {
          console.log("err ===>", err);
          //logout()
        },
      });
      // setTimeout(() => {
      //   logout()
      // }, 3000)
    },
  });

  //
  useEffect(() => {
    const token = localStorage.getItem("teachify_token") ?? "";
    getOrderList({
      variables: {
        subdomain: "udnhealth",
        state: "paid",
        sorting: { order: "desc", column: "created_at" },
      },
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
  }, []);

  return (
    <section>
      <h2
        className={`${classes.order__type} ${classes["order__type--success"]}`}
      >
        已完成的訂單
      </h2>
      {orderList.length ? (
        orderList.map((order, i) => (
          <Card key={order.tradeNo + i} {...{ order }} />
        ))
      ) : (
        <></>
      )}
    </section>
  );
}
