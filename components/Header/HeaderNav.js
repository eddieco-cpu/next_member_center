import Link from "next/link";
import classes from "./index.module.scss";
import HeaderNavItem from "./HeaderNavItem";
import HeaderNavSec from "./HeaderNavSec";

export const regex = /^##/; // 正則表達式檢查  是否以特定符號開頭（在這裡是 '##'）
export const headerNav = [
  {
    link: "/user",
    title: "用戶專區",
    items: [
      {
        link: "",
        title: "用戶狀態",
      },
      {
        link: "/profile",
        title: "個人資料",
      },
      {
        link: "/notification",
        title: "通知中心",
      },
    ],
  },
  {
    link: "/order",
    title: "訂單管理",
    items: [
      {
        link: "",
        title: "訂單明細",
      },
      {
        link: "/course",
        title: "我的課程",
      },
    ],
  },
  {
    link: "/collection/1",
    title: "我的最愛",
    items: [
      {
        link: "",
        title: "我的收藏",
      },
      {
        link: "##/track",
        title: "專家追蹤",
      },
    ],
  },
  {
    link: "/retirement",
    title: "退休力檢測",
    items: [],
  },
  {
    link: "/rights",
    title: "注意事項",
    items: [],
  },
];

export default function HeaderNav() {
  return (
    <>
      <ul className={classes.nav + " " + classes.nav__container}>
        {headerNav.map((nav, index) => (
          <li key={index} className={classes.nav__link__wrapper + " "}>
            <HeaderNavItem
              href={nav.link}
              className={classes.nav__link}
              classNameActiveDep={nav.link}
              ActiveExactMatch={false}
            >
              {nav.title}
            </HeaderNavItem>

            {nav.items.length > 0 && (
              <nav className={classes.nav__sublink__wrapper}>
                {nav.items.map(({ link: secLink, title: secTitle }, index) => (
                  <HeaderNavItem
                    key={index}
                    href={
                      regex.test(secLink)
                        ? secLink.replace(regex, "")
                        : nav.link + secLink
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
            )}
          </li>
        ))}
      </ul>
      <HeaderNavSec />
    </>
  );
}
