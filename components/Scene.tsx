"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import Hero from "./Hero";
import { CameraControls, Scroll, ScrollControls } from "@react-three/drei";
import ScrollManager from "./ScrollManager";
import DeviceScene from "./DeviceScene";

export default function Scene() {
  return (
    <div className="flex h-screen">
      <div className="w-screen">
        <Canvas flat>
          <ScrollControls damping={0.2} pages={2}>
            <Hero />
            <DeviceScene />
            <ScrollManager />
          </ScrollControls>
          {/* <CameraControls/> */}
        </Canvas>
      </div>
    </div>
  );
}
