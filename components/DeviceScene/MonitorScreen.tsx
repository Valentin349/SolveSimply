import * as THREE from "three";
import React, { useRef } from "react";
import { Html, useMask, useScroll } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { StaticImageData } from "next/image";

const screenShader = {
  uniforms: {
    tDiffuse: { type: "t", value: null },
    time: { type: "f", value: 0.0 },
    amount: { type: "f", value: 0.07 },
    size: { type: "f", value: 3.0 },
    distortion: { type: "f", value: 0.7 },
    distortion2: { type: "f", value: 0.5 },
    speed: { type: "f", value: 0.09 },
    rollSpeed: { type: "f", value: 0.0 },
    useScanline: { type: "b", value: true },
  },

  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,

  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float amount;
    uniform float size;
    uniform float distortion;
    uniform float distortion2;
    uniform float speed;
    uniform float rollSpeed;
    uniform bool useScanline;
    varying vec2 vUv;

    // Start Ashima 2D Simplex Noise

    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec2 mod289(vec2 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec3 permute(vec3 x) {
      return mod289(((x * 34.0) + 1.0) * x);
    }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);

      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;

      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
      m = m * m;
      m = m * m;

      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;

      m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    // End Ashima 2D Simplex Noise

    float rand(vec2 co) {
      return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 p = vUv;

      float ty = time * speed;
      float yt = p.y - ty;

      float offset = snoise(vec2(yt * 3.0, 0.0)) * 0.2;
      offset = offset * distortion * offset * distortion * offset;
      offset += snoise(vec2(yt * 50.0, 0.0)) * distortion2 * 0.001;

      float scanline = mod(gl_FragCoord.y, 2.0) < 1.0 ? 0.0 : 1.0;

      vec4 color = texture2D(tDiffuse, vec2(fract(p.x + offset), fract(p.y - time * rollSpeed)));
      float xs = floor(gl_FragCoord.x / size);
      float ys = floor(gl_FragCoord.y / size);
      vec4 snow = vec4(rand(vec2(xs * time, ys * time)) * amount);

      gl_FragColor = useScanline ? color + scanline * 0.02 + snow : color + snow;
    }
  `,
};

export default function MonitorScreen({
  screenPosition,
  planeArgs,
  maskId,
  image,
  scrollStart,
  scrollDistance,
  scrollFactor,
  props,
}: {
  screenPosition: number[];
  planeArgs: number[];
  maskId: number;
  image: StaticImageData;
  scrollStart: number;
  scrollDistance: number;
  scrollFactor: number;
  props?: JSX.IntrinsicElements["mesh"];
}) {
  const texture = useLoader(THREE.TextureLoader, image.src);
  const stencil = useMask(maskId);

  const scroll = useScroll();
  const screenRef = useRef<THREE.Mesh>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(() => {
    shaderRef.current!.uniforms.time.value += 0.01;
    if (screenRef.current) {
      screenRef.current.position.set(
        screenPosition[0],
        screenPosition[1] +
          scroll.range(scrollStart, scrollDistance) * scrollFactor,
        screenPosition[2]
      );
    }
  });
  return (
    <mesh
      ref={screenRef}
      position={[screenPosition[0], screenPosition[1], screenPosition[2]]}
      {...props}
    >
      <planeGeometry args={[planeArgs[0], planeArgs[1], planeArgs[2]]} />
      <shaderMaterial
        ref={shaderRef}
        uniforms-tDiffuse-value={texture}
        attach={"material"}
        args={[screenShader]}
        {...stencil}
      />
    </mesh>
  );
}
