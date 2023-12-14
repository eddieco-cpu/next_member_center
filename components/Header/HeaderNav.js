import Link from "next/link";
import classes from "./index.module.scss";

const regex = /^##/; // 正則表達式檢查  是否以特定符號開頭（在這裡是 '##'）
const headerNav = [
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
    <ul className={classes.nav + " " + classes.nav__container}>
      {headerNav.map((nav, index) => (
        <li key={index} className={classes.nav__link__wrapper + " "}>
          <Link href={nav.link} className={classes.nav__link}>
            {nav.title}
          </Link>

          {nav.items.length > 0 && (
            <nav className={classes.nav__sublink__wrapper}>
              {nav.items.map(({ link, title }, index) => (
                <Link
                  key={index}
                  href={
                    regex.test(link) ? link.replace(regex, "") : nav.link + link
                  }
                  className={classes.nav__sublink}
                >
                  {title}
                </Link>
              ))}
            </nav>
          )}
        </li>
      ))}
    </ul>
  );
}
