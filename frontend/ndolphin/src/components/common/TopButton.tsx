import React, { useState, useEffect } from "react";
import { GoMoveToTop } from "react-icons/go";

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {isVisible && (
        <button className="w-12 h-12 bg-yellow-500 text-white rounded-full shadow-md hover:bg-yellow-600 transition duration-200 ease-in-out" onClick={scrollToTop}>
          <GoMoveToTop />
        </button>
      )}
    </div>
  );
};

export default TopButton;
