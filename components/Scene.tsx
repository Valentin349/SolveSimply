"use client";
import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Hero from "./HeroScene/Hero";
import { ScrollControls, useScroll } from "@react-three/drei";
import CameraController from "./CameraController";
import DeviceScene from "./DeviceScene/DeviceScene";
import HtmlScene from "./HtmlScene";

export default function Scene() {
  return (
    <div className="flex h-screen">
      <div className="w-screen">
        <Canvas shadows flat>
          <fog attach={"fog"} near={5} far={11} color={"#EAE7DC"} />

          <ScrollControls damping={0.25} pages={4}>
            <Hero />
            <DeviceScene />
            <HtmlScene />
            <CameraController />
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  );
}
