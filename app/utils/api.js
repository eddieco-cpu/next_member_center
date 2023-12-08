import axios from "axios";

export function postForm(url, data) {
  //
  const formData = new URLSearchParams();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  const axiosInstance = axios.create({
    xsrfCookieName: "",
    xsrfHeaderName: "",
    withCredentials: true,
  });

  return axiosInstance.post(url, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    method: "POST",
  });
}

export let loginDomain = "https://health-feg.udn.com";
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:8887"
//     : "https://health-feg.udn.com";
