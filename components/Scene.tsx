"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import Hero from "./Hero";
import { ScrollControls } from "@react-three/drei";
import ScrollManager from "./ScrollManager";
import DeviceScene from "./DeviceScene";

export default function Scene() {
  return (
    <div className="flex h-screen">
      <div className="w-screen">
        <Canvas shadows flat>
          <fog attach={"fog"} near={5} far={11} color={"#EAE7DC"} />

          <ScrollControls damping={0.2} pages={3}>
            <Hero />
            <DeviceScene />
            <ScrollManager />
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  );
}
