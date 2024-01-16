"use client";

import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

import classes from "../page.module.scss";
import Course from "./Course";

import { getTeachifyCourseSyntax } from "@utils/graphqlSyntax";

function sortedData(rawData) {
  const flatedArray = [
    ...rawData?.purchasedCourses,
    ...rawData?.attendedSessions.nodes,
  ];
  const sortedArray = [];
  flatedArray.forEach((el) => {
    sortedArray.push({
      name: el.name,
      progress:
        el.detailProgress?.completionRate >= 0
          ? el.detailProgress?.completionRate
          : null,
      slug: el.slug,
      image: el.image || el.coverPhoto,
      tag: !el.tags ? null : el.tags.includes("實體課程") ? "實體課程" : null,
    });
  });
  return sortedArray;
}

export default function Wrapper() {
  //
  const [courseList, setCourseList] = useState([]);
  const [getTeachifyCourse] = useLazyQuery(
    getTeachifyCourseSyntax,
    {
      onCompleted: (data) => {
        let sort = sortedData(data);
        console.log("sort ===>", sort);
        setCourseList([...sort]);
      },
      onError: (err) => {
        HealthModal.alert({
          title: "系統錯誤",
          text: err,
        });
        // logout()
        //setIsLoading(false);
        return;
      },
    },
    []
  );

  useEffect(() => {
    console.log("gql ===>");
    const token = localStorage.getItem("teachify_token") ?? "";
    getTeachifyCourse({
      variables: { subdomain: "udnhealth" },
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
  }, []);

  //
  return (
    <section className={classes.course__wrapper}>
      {courseList.length ? (
        courseList.map((course, i) => <Course key={i} data={course} />)
      ) : (
        <></>
      )}
    </section>
  );
}
