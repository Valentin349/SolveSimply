"use client";
import React, { useState, useEffect, SyntheticEvent, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Globe from "./globeModel";
import * as THREE from "three";
import { ScrollControls, Text } from "@react-three/drei";
import ScrollManager from "./ScrollManager";

export default function Hero() {
  const [scale, setScale] = useState(4);
  const [position, setPosition] = useState([0, 0, 0]);
  const aspectThreshold = 1.2;

  const handleClick = () => {
    // button click
  }

  useEffect(() => {
    const updateScaleAndPosition = () => {
      const aspect = Math.max(window.innerWidth / window.innerHeight, 0.5);
      let newScale = Math.pow(aspect, 0.45) * 2.5;
      newScale = aspect < 1.2 ? newScale + 0.5 : newScale;
      setScale(newScale);

      const newPosition =
        aspect < aspectThreshold ? [0, -2.5, 0] : [3, -0.4, 0];
      setPosition(newPosition);
    };

    updateScaleAndPosition();
    window.addEventListener("resize", updateScaleAndPosition);

    return () => {
      window.removeEventListener("resize", updateScaleAndPosition);
    };
  }, []);

  // Convert the array position to Vector3 before passing it to the Globe component
  const vectorPosition = new THREE.Vector3(
    position[0],
    position[1],
    position[2]
  );

  return (
    <div className="flex h-screen">
      <div className="w-screen">
        <Canvas>
          <group position={[-2, 0.3, 3]}>
            <Text fontSize={0.4} color={"#D8C3A5"}>
              SolveSimply.
            </Text>
            <group position={[0, -0.5, 0]} onClick={handleClick}>
              <Text fontSize={0.08} color={"silver"} >
                Get Started
              </Text>
              <mesh scale={[0.5, 0.15, 1]}>
                <planeGeometry />
                <meshBasicMaterial
                  color={"#e85a4f"}
                  opacity={0.3}
                  depthWrite={false}
                />
              </mesh>
            </group>
          </group>

          <ScrollControls damping={0.25}>
            <Globe scale={scale} position={vectorPosition} />
            <ScrollManager />
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  );
}
