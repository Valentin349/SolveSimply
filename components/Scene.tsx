"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import Hero from "./HeroScene/Hero";
import { Html, Scroll, ScrollControls } from "@react-three/drei";
import CameraController from "./CameraController";
import DeviceScene from "./DeviceScene/DeviceScene";
import Products from "./Products";
import ContactForm from "./ContactForm";

export default function Scene() {
  return (
    <div className="flex h-screen">
      <div className="w-screen">
        <Canvas shadows flat>
          <fog attach={"fog"} near={5} far={11} color={"#EAE7DC"} />

          <ScrollControls damping={0.25} pages={4}>
            <Hero />
            <DeviceScene />
            <Products />
            <CameraController />
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  );
}
