"use client";
import { useState, createContext } from "react";

//
const GlobalContext = createContext();

export default function GlobalProvider(props) {
  //
  const [test, setTest] = useState("測試文字");
  const [switchOverLayMenu, setSwitchOverLayMenu] = useState(false);

  return (
    <>
      <GlobalContext.Provider
        value={{ test, setTest, switchOverLayMenu, setSwitchOverLayMenu }}
      >
        {props.children}
      </GlobalContext.Provider>
    </>
  );
}

//
export { GlobalContext };
