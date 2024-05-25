import { useEffect, useRef } from "react";

export const useOutsideClick = (handler, listenCapturing = true) => {
  const ref = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }
    document.addEventListener("click", handleOutsideClick, listenCapturing);

    return () =>
      document.removeEventListener(
        "click",
        handleOutsideClick,
        listenCapturing
      );
  }, [handler, listenCapturing]);

  return ref;
};
