"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import Hero from "./Hero";
import { ScrollControls } from "@react-three/drei";
import ScrollManager from "./ScrollManager";

export default function Scene() {
  return (
    <div className="flex h-screen">
      <div className="w-screen">
        <Canvas flat>
          <Hero />

          <ScrollControls damping={0.2} pages={2}>
            <ScrollManager/>
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  );
}
