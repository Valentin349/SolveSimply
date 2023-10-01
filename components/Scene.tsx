"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Hero from "./HeroScene/Hero";
import { Html, ScrollControls, useProgress } from "@react-three/drei";
import CameraController from "./CameraController";
import DeviceScene from "./DeviceScene/DeviceScene";
import HtmlScene from "./HtmlScene";

export default function Scene() {
  function Loader() {
    const { progress } = useProgress();

    return (
      <Html center>
        <div className="w-full h-4 bg-darkGrey">
          <div
            className={`h-full w-[${progress}%] bg-darkPink transition-all ease-linear duration-300`}
          ></div>
          <div className="text-center text-sm mt-1">{Math.round(progress)}% loaded</div>
        </div>
      </Html>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="w-screen">
        <Canvas id="Canvas" shadows flat>
          <fog attach={"fog"} near={5} far={11} color={"#EAE7DC"} />

          <ScrollControls damping={0.25} pages={4}>
            <Suspense fallback={<Loader />}>
              <Hero />
              <DeviceScene />
              <CameraController />
            </Suspense>
            <HtmlScene />
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  );
}
