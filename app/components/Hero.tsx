"use client";
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Globe from "./globeModel";
import { Vector3 } from 'three';

export default function Hero() {
  const [scale, setScale] = useState(4);
  const [position, setPosition] = useState([0, 0, 0]);
  const aspectThreshold = 1.2;

  useEffect(() => {
    const updateScaleAndPosition = () => {
      const aspect = Math.max((window.innerWidth / window.innerHeight), 0.5);
      let newScale = Math.pow(aspect, 0.45) * 2.5 ; 
      newScale = aspect < 1.2 ? newScale + 0.5 : newScale;
      setScale(newScale);

      const newPosition = aspect < aspectThreshold  ? [0, -2.5, 0] : [3, -0.4, 0];
      setPosition(newPosition);
    };

    updateScaleAndPosition();
    window.addEventListener("resize", updateScaleAndPosition);

    return () => {
      window.removeEventListener("resize", updateScaleAndPosition);
    };
  }, []);

  // Convert the array position to Vector3 before passing it to the Globe component
  const vectorPosition = new Vector3(position[0], position[1], position[2]);

  return (
    <div className="flex h-screen">
      <div className="w-screen">
          <Canvas>
            <Globe scale={scale} position={vectorPosition} />
          </Canvas>
        </div>
    </div>
  );
}



