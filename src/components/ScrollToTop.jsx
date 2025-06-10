import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ containerSelector }) {
  const location = useLocation();

  useEffect(() => {
    const scrollableContainer = document.querySelector(containerSelector);
    if (scrollableContainer) return scrollableContainer.scrollTo(0, 0);
    return window.scrollTo(0, 0);
  }, [location.key, containerSelector]);

  return null;
}

export function ScrollToTopClick({ containerSelector }) {
  const handleScrollToTop = () => {
    const scrollableContainer = document.querySelector(containerSelector);
    if (scrollableContainer) {
      scrollableContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-5 right-10 bg-blue-600 text-white p-3 h-20 w-20 rounded-full shadow-md hover:bg-blue-700 transition"
    >
      ↑
    </button>
  );
}
