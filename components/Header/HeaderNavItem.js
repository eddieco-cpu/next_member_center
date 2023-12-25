"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";
import classes from "./index.module.scss";

export default function HeaderNavItem({
  children,
  className,
  classNameActiveDep,
  ActiveExactMatch,
  ...props
}) {
  const pathname = usePathname();

  return (
    <>
      <Link
        {...props}
        className={
          `${className} ` +
          (ActiveExactMatch
            ? pathname === classNameActiveDep
              ? classes.active
              : ""
            : pathname.includes(classNameActiveDep)
            ? classes.active
            : "") +
          (!ActiveExactMatch &&
          pathname.startsWith("/track") &&
          classNameActiveDep === "/collection/1"
            ? ` ${classes.active}`
            : "")
        }
      >
        {children}
      </Link>
    </>
  );
}
