import React, { useState } from "react";
import Typewriter from "typewriter-effect";

export default function MonitorHtml({ aspect }: { aspect: number }) {
  const words = ["Websites.", "Virtual Assistants.", "Booking Systems."];
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="h-full flex justify-between flex-col">
      <div className={`${aspect < 1.2 ? "h-0.5 pb-1 ml-5" : "text-right pr-[7px] pt-12"}`} >
        <h3 className="text-lightPink text-[9px]">We make</h3>
      </div>

      <div
        className={`flex ${aspect < 1.2 ? "text-left  ml-5" :  "justify-end text-[12px] "}`}
      >
        <h2 className="text-lightPink">
          {
            <Typewriter
              options={{
                strings: words,
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 2,
              }}
            />
          }
        </h2>
      </div>

      <div
        className={`flex ${
          aspect < 1.2 ? "text-2xl pb-12 pr-3 mr-3 justify-end" : "pb-10 pl-5"
        }`}
      >
        
        <h2
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`text-darkPink font-black w-fit transition-colors ${
            isHovered ? "hover:bg-black ": ""
          }`}
        >
          {isHovered ? "Bespoke." : "Simple."}
        </h2>
      </div>
    </div>
  );
}
