import axios from "axios";

const axiosInstance = axios.create({
  xsrfCookieName: "",
  xsrfHeaderName: "",
  withCredentials: true,
});

export function postForm(url, data) {
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

export function getData(url, option = { auth: true }) {
  return axiosInstance({
    url,
    withCredentials: option.auth,
    method: "GET",
  });
}

export let loginDomain = "https://health-feg.udn.com";
// process.env.NODE_ENV === "development"
//   ? "http://localhost:8887"
//   : "https://health-feg.udn.com";

export const FOOTER = loginDomain + "/api/member/component";
