"use client";

import React, { useContext, useState, useEffect } from "react";

import { HeaderContext } from "@contexts/headerContext";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;
const ROOT = process.env.NEXT_PUBLIC_ROOT;

function injectionScript(callback) {
  const navMenu = document?.getElementsByClassName("nav-menu")[0];
  const fullMenu = document?.getElementsByClassName("search-menu")[0]
    ?.children[0];
  const closeBtn = document?.getElementsByClassName("close-btn")[0];
  const searchBtn = document.querySelector(".btn-search");
  const searchInput = document.querySelector(".input-holder input");

  navMenu?.addEventListener("click", function () {
    fullMenu.classList.add("search-menu--block");
  });

  closeBtn?.addEventListener("click", function () {
    //fullMenu.classList.remove("search-menu--block");
    //alert("close");
    callback();
  });

  searchBtn?.addEventListener("click", function () {
    window.location.href =
      "/health/search/" + encodeURIComponent(searchInput.value);
  });

  searchInput?.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      window.location.href =
        "/health/search/" + encodeURIComponent(searchInput.value);
    }
  });
}

const OverLayMenu = () => {
  //
  const { switchOverLayMenu, setSwitchOverLayMenu } = useContext(HeaderContext);
  const [overLayHTML, setOverLayHTML] = useState("");

  const closeSwitchOverLayMenu = () => setSwitchOverLayMenu(false);

  useEffect(() => {
    if (overLayHTML) return;

    async function fetchData() {
      const res = await fetch(
        `${ROOT}${BASE_PATH}/udn/api/line3?channelId=1005`
      );
      const data = await res.json();
      //console.log(data);
      setOverLayHTML(data.html);
    }

    try {
      fetchData();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, [overLayHTML]);

  useEffect(() => {
    if (!switchOverLayMenu) return;
    injectionScript(closeSwitchOverLayMenu);
  }, [switchOverLayMenu]);

  return (
    <div
      className={
        (switchOverLayMenu ? "search-menu--block" : "") +
        " overlay-menu search-menu--none"
      }
    >
      <div
        className="channel__container"
        dangerouslySetInnerHTML={{ __html: overLayHTML }}
      ></div>
    </div>
  );
};

export default OverLayMenu;
