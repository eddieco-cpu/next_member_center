"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import classes from "./layout.module.scss";

export default function PopupFrame(props) {
  //
  const router = useRouter();

  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [movedX, setMovedX] = useState(0);
  const [movedY, setMovedY] = useState(0);

  //
  function onDismiss() {
    router.back();
  }
  const integer = (value) => Math.round(value * 10) / 10;
  const initDrag = (e) => {
    setIsDragging(true);
    setOffsetX(integer(e.clientX - movedX));
    setOffsetY(integer(e.clientY - movedY));
  };
  const doDrag = (e) => {
    if (!isDragging) return;
    setMovedX(integer(e.clientX - offsetX));
    setMovedY(integer(e.clientY - offsetY));
  };
  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <div className={classes["popup-backdrop"]} onClick={onDismiss}>
      <dialog
        className={classes["popup"]}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => initDrag(e)}
        onMouseMove={(e) => doDrag(e)}
        onMouseUp={() => stopDrag()}
        style={{ ["--x"]: `${movedX}px`, ["--y"]: `${movedY}px` }}
      >
        {props.children}
        <i
          onClick={onDismiss}
          className={"close " + classes["popup--close-button"]}
        />
      </dialog>
    </div>
  );
}
