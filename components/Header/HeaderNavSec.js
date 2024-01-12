"use client";

import { usePathname } from "next/navigation";
import React from "react";

import { BASE_PATH } from "@utils/api";
import { headerNav, regex } from "./HeaderNav";
import HeaderNavItem from "./HeaderNavItem";
import classes from "./index.module.scss";

export default function HeaderNavSec() {
  const pathname = usePathname().toString().replace(BASE_PATH, "");
  const nav =
    headerNav.find((nav) => pathname.startsWith(nav.link)) ||
    (pathname.startsWith("/track")
      ? headerNav.find((nav) => nav.link.includes("/collection"))
      : null);

  return (
    <nav className={classes.nav__mobile + " " + classes.nav__sublink__wrapper}>
      {nav?.items &&
        nav.items.map(({ link: secLink, title: secTitle }, index) => (
          <HeaderNavItem
            key={index}
            href={
              BASE_PATH +
              (regex.test(secLink)
                ? secLink.replace(regex, "")
                : nav.link + secLink)
            }
            className={classes.nav__sublink}
            classNameActiveDep={
              regex.test(secLink)
                ? secLink.replace(regex, "")
                : nav.link + secLink
            }
            ActiveExactMatch={true}
          >
            {secTitle}
          </HeaderNavItem>
        ))}
    </nav>
  );
}
