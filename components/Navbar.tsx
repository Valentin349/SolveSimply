"use client"
import { useState } from "react";
import logo from "../public/logo.png";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-screen z-50 flex justify-center items-center my-2 ">
      <div className="rounded-[50px] md:w-[50%] flex flex-col md:flex-row justify-between py-2 md:py-2 px-5 md:px-10 bg-smokeyGrey bg-opacity-50 backdrop-blur-md shadow-md items-center">
        <div className="">
          <button onClick={toggleNavbar} className="">
            <Image src={logo.src} width={50} height={50} alt="SolveSimply Logo"/>
          </button>
        </div>

        <ul className={`md:flex uppercase decoration-4 py-1 md:flex-row md:space-x-8 ${isOpen ? "flex-col" : "hidden"} items-center`}>
          <li className="hover:underline decoration-darkPink ">
            <a href="">Services</a>
          </li>

          <li className="hover:underline decoration-darkPink ">
            <a href="">Pricing</a>
          </li>

          <li className="hover:underline decoration-darkPink ">
            <a href="">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
