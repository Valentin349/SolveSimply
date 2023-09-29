"use client"
import { useEffect, useState } from "react";
import logo from "../public/logo.png";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Check the screen size when the component mounts and on window resize
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust the screen size threshold as needed
    };

    handleResize(); // Check initial screen size

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScrollTo = (distance:number) => {
    toggleNavbar();
    const element = document.getElementById('ScrollContainer');
    if (element) {
      element.scrollTop = element.scrollHeight * distance
    }

  }

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`fixed w-screen z-50 flex justify-center items-center my-2 ${isSmallScreen && isOpen ? "my-0" :""}`}>
      <div className={`${isSmallScreen && isOpen ? "" :"rounded-[50px]"} md:w-[50%] flex flex-col md:flex-row justify-between py-2 md:py-2 px-5 md:px-10 backdrop-blur-md shadow-md items-center `}>
        <div className="min-h-[1vh]">
          <button onClick={toggleNavbar} className={`${isSmallScreen && isOpen ? "py-10 px-10" : ""}`}>
            {isSmallScreen && isOpen ? (
              <span className="text-darkPink font-black text-4xl">x</span>
            ) : (
              <Image src={logo.src} width={30} height={30} alt="SolveSimply Logo" />
            )}
          </button>
        </div>

        <ul className={`text-black md:flex transition-transform duration-300 ease-in-out uppercase decoration-4 py-1 md:flex-row md:w-fit md:h-fit md:space-x-5 lg:space-x-8 ${isSmallScreen && isOpen ? "flex-col w-screen h-screen text-center justify-around" : "hidden"} items-center`}>
          <li className="my-16 py-5 md:py-0 md:my-0 hover:underline decoration-darkPink">
          <button onClick={() => handleScrollTo(0.25)}>Services</button>
          </li>

          <li className="my-16 py-5 md:py-0 md:my-0 hover:underline decoration-darkPink">
          <button onClick={() => handleScrollTo(0.72)}>Prices</button>
          </li>

          <li className="my-16 py-5 md:py-0 md:my-0 hover:underline decoration-darkPink">
          <button onClick={() => handleScrollTo(1)}>Contact</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
