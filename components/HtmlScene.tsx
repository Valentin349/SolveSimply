import { Html, useScroll } from "@react-three/drei";
import { Vector3 } from "three";
import ContactForm from "./ContactForm";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Products from "./Products";

export default function HtmlScene() {
  const scroll = useScroll();
  const htmlPosition = new Vector3(3, -1, 8);
  const ref = useRef<HTMLDivElement>(null)

  useFrame(() => {
    if (ref.current){
      ref.current.style.transform = `translateY(-${(ref.current.scrollHeight-window.innerHeight + 150) * scroll.range(0.9,0.1)}px)` ;
    }
  })

  return (
    <Html ref={ref} portal={{ current: scroll.fixed }} position={htmlPosition} fullscreen>
      <div className="flex items-center h-screen flex-col mt-48 top-[-2rem]">
        <Products />
        <ContactForm/>
      </div>
    </Html>
  );
}
