"use client";

import React, { useContext } from "react";
import { GlobalContext } from "@contexts/globalContext";

export default function Loading() {
  //
  const { isLoading } = useContext(GlobalContext);

  //
  if (!isLoading) {
    return null;
  } else {
    return <div className="loading loading--browser"></div>;
  }
}
