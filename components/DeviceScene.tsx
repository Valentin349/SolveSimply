import { CameraControls } from "@react-three/drei";
import Phone from "./Phone";
import Monitor from "./Monitor";
import { useEffect, useRef } from "react";

export default function DeviceScene() {
  const light = useRef<THREE.RectAreaLight>(null);

  return (
    <group name="DeviceScene">
      <ambientLight />
      <rectAreaLight
        rotation={[0, Math.PI, 0]}
        position={[-0.2, 0.3, 2.26]}
        width={3.6}
        height={2}
        intensity={8}
      />
      <Monitor />
      <Phone position={[-3, -1.1, 2.3]} />
    </group>
  );
}
