import Link from "next/link";
import classes from "./index.module.scss";

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
    link: "",
    title: "我的最愛",
    items: [
      {
        link: "/collection",
        title: "我的收藏",
      },
      {
        link: "/track",
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
        <li key={index} className={classes.nav__link__wrapper}>
          <Link href={nav.link} className={classes.nav__link}>
            {nav.title}
          </Link>
          {/* {nav.items.length > 0 && (
                <ul className="nav__link__wrapper__sub">
                  {nav.items.map((item, index) => {
                    <li>
                      <Link href={item.link}>
                        <a>{item.title}</a>
                      </Link>
                    </li>;
                  })}
                </ul>
              )} */}
        </li>
      ))}
    </ul>
  );
}
