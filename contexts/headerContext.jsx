"use client";
import { useState, createContext } from "react";

//
const HeaderContext = createContext();

const HeaderProvider = ({ children }) => {
  //
  const [switchOverLayMenu, setSwitchOverLayMenu] = useState(false);

  return (
    <>
      <HeaderContext.Provider
        value={{ switchOverLayMenu, setSwitchOverLayMenu }}
      >
        {children}
      </HeaderContext.Provider>
    </>
  );
};

//
export default HeaderProvider;
export { HeaderContext };
