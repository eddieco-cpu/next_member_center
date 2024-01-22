"use client";
import cookies from "js-cookie";
import { useState, createContext } from "react";
import { getData, NOTIFICATION_LIST } from "@utils/api";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  //
  const [isLoading, setIsLoading] = useState(false);
  const [notificationData, setNotificationData] = useState({})

  const forcedLogout = () => {
    cookies.remove(
      "um2"
      //{ path: "/", domain: ".udn.com" }
    );
    cookies.remove(
      "udnmember"
      //{ path: "/", domain: ".udn.com" }
    );
    localStorage.removeItem("teachify_token");
    localStorage.removeItem("teachify_user");
    cookies.remove(
      "udngold"
      //{ path: "/", domain: ".udn.com" }
    );
    cookies.remove(
      "udnland"
      //{ path: "/", domain: ".udn.com" }
    );
    cookies.remove(
      "udnavatar"
      //{ path: "/", domain: ".udn.com" }
    );
    cookies.remove(
      "udnnick"
      //{ path: "/", domain: ".udn.com" }
    );
    cookies.remove("udnsession");
    cookies.remove(
      "snsmember"
      //{ domain: ".udn.com" }
    );
    cookies.remove("fg_avatar", { domain: ".udn.com" });
    cookies.remove("fg_cassync", { domain: ".udn.com" });
    cookies.remove("fg_id", { domain: ".udn.com" });
    cookies.remove("fg_seq", { domain: ".udn.com" });
    cookies.remove("fg_type", { domain: ".udn.com" });
    cookies.remove("custom_teachify_user_id");
  };
  const logout = () => {
    return new Promise((resolve) => {
      HealthModal.confirm({
        title: "",
        text: "確認登出嗎？",
        callback: () => {
          setIsLoading(true);
          forcedLogout();
          resolve(true);
        },
        cancelCallback: () => {
          //alert("取消登出");
          resolve(false);
        },
      });
    });
  };

  const getNotification = async () => {
    console.log('getNotification')
    const { data } = await getData(BASE_PATH + NOTIFICATION_LIST, { auth: true })
    console.log('notificationData', data)
    setNotificationData(data)
    // try {
    //   setNotificationData(data)
    // } catch (error) {
    //   setNotificationData({})
    // }
  }


  return (
    <>
      <GlobalContext.Provider
        value={{ logout, forcedLogout, isLoading, setIsLoading, getNotification, notificationData }}
      >
        {children}
      </GlobalContext.Provider>
    </>
  );
};

//
export default GlobalProvider;
export { GlobalContext };
