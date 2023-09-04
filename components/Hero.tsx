"use client";
import React, { useState, useEffect } from "react";
import Globe from "./GlobeModel";
import * as THREE from "three";
import { Text } from "@react-three/drei";

export default function Hero() {
  const [scale, setScale] = useState(4);
  const [globePosition, setGlobePosition] = useState([0, 0, 0]);
  const [heroPosition, setHeroPosition] = useState([0, 0, 0]);
  const [hovered, setHovered] = useState(false);
  const aspectThreshold = 1.2;

  const title = "SolveSimply.";
  const subTitle = "Real Estate Tech Experts";

  const handleClick = () => {
    // button click
  };

  useEffect(() => {
    const updateScaleAndPosition = () => {
      const aspect = Math.max(window.innerWidth / window.innerHeight, 0.5);
      let newScale = Math.pow(aspect, 0.45) * 2.5;
      newScale = aspect < 1.2 ? newScale + 0.5 : newScale;
      setScale(newScale);

      const heroX = -window.innerWidth / window.innerHeight + 0.3;
      setHeroPosition(aspect < aspectThreshold ? [0, 1, 3] : [heroX, 0.3, 3]);
      setGlobePosition(aspect < aspectThreshold ? [0, -2.5, 0] : [3, -0.4, 0]);
    };

    updateScaleAndPosition();
    window.addEventListener("resize", updateScaleAndPosition);

    return () => {
      window.removeEventListener("resize", updateScaleAndPosition);
    };
  }, []);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  // Convert the array position to Vector3 before passing it to the Globe component
  const vectorGlobePosition = new THREE.Vector3(
    globePosition[0],
    globePosition[1],
    globePosition[2]
  );

  const vectorHeroPosition = new THREE.Vector3(
    heroPosition[0],
    heroPosition[1],
    heroPosition[2]
  );

  return (
    <group name="HeroScene" >
      <ambientLight />
      <pointLight position={[0, 0, 0]} intensity={1.8} />
      <group scale={scale * 0.25} position={vectorHeroPosition}>
        <Text fontSize={0.4} color={"#e85a4f"}>
          {title}
        </Text>
        <Text fontSize={0.12} position={[0, -0.3, 0]} color={"#E98074"}>
          {subTitle}
        </Text>
        <group position={[0, -0.7, 0]} onClick={handleClick}>
          <Text fontSize={0.08} color={"white"}>
            Get Started
          </Text>
          <mesh
            scale={[0.5, 0.15, 1.1]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <planeGeometry />
            <meshBasicMaterial
              color={"#D8C3A5"}
              opacity={0.3}
              depthWrite={false}
            />
          </mesh>
        </group>
      </group>

      <Globe scale={scale} position={vectorGlobePosition} />
    </group>
  );
}
