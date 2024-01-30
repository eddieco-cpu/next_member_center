"use client";

import { usePathname } from "next/navigation";
import React from "react";

import { Btn } from "@components/ui/Layout";

export default function ToFaqLinker() {
  //
  const pathname = usePathname();

  return (
    <>
      {!/login/.test(pathname) && (
        <Btn className="qa-btn">
          <a className="qa-link" href="/health/faq">
            有問題嗎? 聯絡客服 &gt;
          </a>
        </Btn>
      )}
    </>
  );
}
