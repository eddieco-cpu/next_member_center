"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import classes from "./layout.module.scss";


export default function PopupFrame({children, onTogglePrev, onToggleNext}) {
  //
  const router = useRouter();

  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [movedX, setMovedX] = useState(sessionStorage?.getItem("popupFrameMovedX") * 1 || 0);
  const [movedY, setMovedY] = useState(sessionStorage?.getItem("popupFrameMovedY") * 1 || 0);

  //
  function onDismiss() {
    router.back();
  }
  const integer = (value) => Math.round(value * 10) / 10;
  const limitValue = (value, limit = 100) => Math.min(limit, Math.max(limit * -1, value));

  const initDrag = (e) => {
    setIsDragging(true);
    setOffsetX(integer(e.clientX - movedX));
    setOffsetY(integer(e.clientY - movedY));
  };
  const doDrag = (e) => {
    if (!isDragging) return;
    setMovedX(limitValue(integer(e.clientX - offsetX), 500));
    setMovedY(limitValue(integer(e.clientY - offsetY), 500));
  };
  const stopDrag = () => {
    sessionStorage.setItem("popupFrameMovedX", movedX);
    sessionStorage.setItem("popupFrameMovedY", movedY);
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
        {children}
        <i
          onClick={onDismiss}
          className={`close ${classes["popup-button"]} ${classes["popup-button--close"]}`}
        />
        {
          onTogglePrev && (
            <i
              onClick={onTogglePrev}
              className={`i-arrow7-left ${classes["popup-button"]} ${classes["popup-button--toggle-prev"]}`}
            />
          )
        }
        {
          onToggleNext && (
            <i
              onClick={onToggleNext}
              className={`i-arrow7-right ${classes["popup-button"]} ${classes["popup-button--toggle-next"]}`}
            />
          )
        }
      </dialog>
    </div>
  );
}
