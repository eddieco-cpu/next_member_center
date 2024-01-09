"use client";

import React, { useState, useEffect, Fragment } from "react";
import { useRouter, usePathname } from "next/navigation";

import classes from "./ui/layout.module.scss";

//
export default function Pagination({ total: totalPage = 1 }) {
  //
  const router = useRouter();
  const pathname = usePathname();

  const pathArray = pathname.split("/");
  const pageId = pathArray[pathArray.length - 1];
  const currentPathWithoutPageId = pathArray.slice(0, -1).join("/");
  const currentPath = currentPathWithoutPageId;

  const [pages, setPages] = useState([]);

  useEffect(() => {
    setPages(() => {
      const pageIdInt = parseInt(pageId);
      const pagesList = Array(totalPage)
        .fill(null)
        .map((_, key) => key + 1);
      if (totalPage <= 5) return pagesList;
      if (pageIdInt <= 3) return pagesList.slice(0, 5);
      if (pageIdInt > 3 && pageIdInt + 2 <= totalPage)
        return pagesList.slice(pageIdInt - 3, pageIdInt + 2);
      return pagesList.slice(-5);
    });
  }, [totalPage]);

  return (
    // <Fragment> == <>, 但是可以存 key 的屬性&值 (only 'key' props )
    <Fragment>
      {totalPage && (
        <div className={classes.pagination}>
          <button
            onClick={() => {
              router.push(`${currentPath}/1`);
            }}
            className={`${classes.pagination__btn} ${
              pageId > 1 && totalPage > 1
                ? `${classes["enable"]} ${classes["pagination__btn--first"]}`
                : classes["pagination__btn--first"]
            }`}
          >
            最前頁
          </button>
          <button
            onClick={() => {
              router.push(`${currentPath}/${parseInt(pageId) - 1}`);
            }}
            className={`${classes.pagination__btn} ${
              pageId > 1 && totalPage > 1
                ? `${classes["pagination__btn--prev"]} ${classes.enable}`
                : classes["pagination__btn--prev"]
            }`}
          >
            上一頁
          </button>
          <div className={classes.pagination__wrapper}>
            <span
              className={`${classes["pagination--hint"]} ${
                pages[0] !== 1 ? classes.show : ""
              }`}
            >
              ...
            </span>
            {pages.map((page, pageKey) => (
              <button
                key={pageKey}
                onClick={() => {
                  router.push(`${currentPath}/${page}`);
                }}
                className={`${classes.pagination__number} ${
                  pageId == page ? classes.active : ""
                } ${pageKey + 1 === pages.length ? classes.last : ""} ${
                  page > 999 ? classes.small : ""
                }`}
              >
                {page}
              </button>
            ))}
            <span
              className={`${classes["pagination--hint"]} ${
                pages[pages.length - 1] !== totalPage ? classes.show : ""
              }`}
            >
              ...
            </span>
          </div>
          <button
            onClick={() => {
              router.push(`${currentPath}/${parseInt(pageId) + 1}`);
            }}
            className={`${classes.pagination__btn} ${
              pageId < totalPage && totalPage > 1
                ? `${classes["pagination__btn--next"]} ${classes.enable}`
                : classes["pagination__btn--next"]
            }`}
          >
            下一頁
          </button>
          <button
            onClick={() => {
              router.push(`${currentPath}/${totalPage}`);
            }}
            className={`${classes.pagination__btn} ${
              pageId < totalPage && totalPage > 1
                ? `${classes.enable} ${classes["pagination__btn--last"]}`
                : `${classes.btn} ${classes["pagination__btn--last"]}`
            }`}
          >
            最後頁
          </button>
          <div className={classes.pagination__total}>
            共 <span>{totalPage}</span> 頁
          </div>
        </div>
      )}
    </Fragment>
  );
}
