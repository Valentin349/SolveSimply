import { Html, useScroll } from "@react-three/drei";
import { Vector3 } from "three";
import Card from "./Card";

export default function Products() {
  const scroll = useScroll();
  return (
    <Html
      portal={{ current: scroll.fixed }}
      position={new Vector3(3, -1, 8)}
      fullscreen
    >
      <div className="flex justify-center items-center h-screen">
        <Card
          title={"Title"}
          description={"Description"}
          vector={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          }
        />
      </div>
    </Html>
  );
}
