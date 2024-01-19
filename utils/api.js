import axios from "axios";

const axiosInstance = axios.create({
  xsrfCookieName: "",
  xsrfHeaderName: "",
  withCredentials: true,
});

export function postForm(url, data) {
  //post without cookie
  //
  const formData = new URLSearchParams();
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return axiosInstance.post(url, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    method: "POST",
  });
}

export function postData(url, data, option = { auth: true }) {
  //post with cookie
  const axiosInstance = axios.create({
    xsrfCookieName: "",
    xsrfHeaderName: "",
    withCredentials: true,
  });
  return axiosInstance({
    url,
    data,
    withCredentials: option.auth,
    method: "POST",
  });
}

export function getData(url, option = { auth: true }) {
  return axiosInstance({
    url,
    withCredentials: option.auth,
    method: "GET",
  });
}

export async function fetchData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function fetchDataWithCookieInServer(url, cookie) {
  try {
    const response = await fetch(url, {
      method: "GET", // 或是 'POST'
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
}

export const GRAPHQL_API = "https://kaik.io/graphql";

export let loginDomain = "https://health-feg.udn.com";
// process.env.NODE_ENV === "development"
//   ? "http://localhost:8887"
//   : "https://health-feg.udn.com";

export const HEALTH_ROOT =
  process.env.NODE_ENV === "development"
    ? "https://lab7-health.udn.com"
    : "https://health.udn.com";

export const FOOTER = `${HEALTH_ROOT}/api/member/component`;

//
export const COLLECTION_LIST_PATH =
  "https://lab7-misc.udn.com/api/collect/mynews"; //"https://interactive.udn.com/api/collect/mynews"; //https://lab7-misc.udn.com/api/collect/mynews

export const COLLECTION_REMOVE_PATH = "/api/collect/switch"; //https://interactive.udn.com/api/collect/switch

//
export const MEMBER_MOBILE_LOGIN = "/do/member/wbs/MemberMobileLogin";
export const MEMBER_EMAIL_LOGIN = "/do/member/wbs/MemberEmailLogin";
export const MEMBER_MOBILE_SEND_CONFIRM =
  "/do/member/wbs/MemberMobileSendConfirm";
export const MEMBER_TEACHIFY = "/api/member/teachify";

//
export const RETIRE_CLIENT_DATA = `${HEALTH_ROOT}/api/retire`;
export const RETIRE_DESCRIPTION = `https://health.udn.com/retire.json`;
export const RETIRE_AVG_DATA = `${HEALTH_ROOT}/api/retire/data`;

//
export const TRACK_STATE = `${HEALTH_ROOT}/api/track/list`;
export const TRACK_EXPERT = `/api/track/expert`;
