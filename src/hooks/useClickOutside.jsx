import { useEffect, useRef } from "react";

export function useClickOutside(onOutsideClick, isActive = true) {
  const elementRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target) &&
        isActive
      )
        return onOutsideClick(event);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onOutsideClick, isActive]);

  return elementRef;
}
