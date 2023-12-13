import Link from "next/link";
import Image from "next/image";
import classes from "./index.module.scss";

import HeaderNav from "./HeaderNav";
import Menu from "./Menu";
import OverLayMenu from "./OverLayMenu";

import GlobalProvider from "../../contexts/global";

export default function Header() {
  return (
    <header className={classes.header}>
      <GlobalProvider>
        <section className={classes.header__wrapper}>
          <div className={classes.logo}>
            <a href="https://udn.com" className={classes["logo-udn"]}>
              <Image
                src="/logo-udn.svg"
                alt="回聯合新聞網首頁"
                width={41}
                height={36.5}
              />
            </a>
            <a href="/health/index" className={classes["logo-health"]}>
              <Image
                src="/logo-health.svg"
                alt="回元氣網首頁"
                width={89}
                height={43.5}
              />
            </a>
          </div>
          <HeaderNav></HeaderNav>
          <Menu></Menu>
        </section>
        <section className="search-menu">
          <OverLayMenu></OverLayMenu>
        </section>
      </GlobalProvider>
    </header>
  );
}
