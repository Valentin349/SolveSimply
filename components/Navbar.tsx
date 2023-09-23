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

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`fixed w-screen z-50 flex justify-center items-center my-2 ${isSmallScreen && isOpen ? "my-0" :""}`}>
      <div className={`${isSmallScreen && isOpen ? "" :"rounded-[50px]"} md:w-[50%] flex flex-col md:flex-row justify-between py-2 md:py-2 px-5 md:px-10 bg-smokeyGrey bg-opacity-50 backdrop-blur-md shadow-md items-center `}>
        <div className="min-h-[1vh] min-w-[]">
          <button onClick={toggleNavbar} className={`${isSmallScreen && isOpen ? "py-10 px-10" : ""}`}>
            {isSmallScreen && isOpen ? (
              <span className="text-darkPink font-black text-4xl">x</span>
            ) : (
              <Image src={logo.src} width={30} height={30} alt="SolveSimply Logo" />
            )}
          </button>
        </div>

        <ul className={`md:flex transition-transform duration-300 ease-in-out uppercase decoration-4 py-1 md:flex-row md:w-fit md:h-fit md:space-x-5 lg:space-x-8 ${isSmallScreen && isOpen ? "flex-col w-screen h-screen text-center justify-around" : "hidden"} items-center`}>
          <li className="my-16 py-5 md:py-0 md:my-0 hover:underline decoration-darkPink">
            <a href="">Services</a>
          </li>

          <li className="my-16 py-5 md:py-0 md:my-0 hover:underline decoration-darkPink">
            <a href="">Pricing</a>
          </li>

          <li className="my-16 py-5 md:py-0 md:my-0 hover:underline decoration-darkPink">
            <a href="">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
