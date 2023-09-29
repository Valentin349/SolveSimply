"use client";
import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [isScrolling, setIsScrolling] = useState(false);

  const checkScrollFinished = () => {
    const element = document.getElementById("ScrollContainer");
    if (element) {
      if (element.scrollTop === (element.scrollHeight - window.innerHeight)) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = () => {
      setIsScrolling(true);

      clearTimeout(scrollTimeout);

      // Set a timeout to detect scrolling end
      scrollTimeout = setTimeout(() => {
          setIsScrolling(checkScrollFinished);
      }, 1000); // Adjust the timeout duration as needed
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchmove", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleWheel);
    };
  }, []);

  return (
    <div
      className={`fixed flex justify-center items-center bottom-12 inset-x-0 transition-opacity ${
        isScrolling ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-8 h-16 rounded-full border-2 border-lightPink p-1 relative">
        <div className="w-5 h-5 rounded-full bg-lightPink absolute top-1 animate-scroll-tailwind"></div>
      </div>
    </div>
  );
}
