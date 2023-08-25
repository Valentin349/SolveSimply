import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    material_0: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("/paper_plane-transformed.glb") as GLTFResult;
  const planeRef = React.useRef<THREE.Mesh>(null);

  return (
    <mesh scale={0.4}>
      <group {...props} scale={0.02} rotation={[-Math.PI, 0, 0]}>
      <mesh
        ref={planeRef}
        geometry={nodes.Object_2.geometry}
        position={[0, -50, 0]}
      >
        <meshStandardMaterial color={"#E98074"} />
      </mesh>
    </group>
    </mesh>
  );
}

useGLTF.preload("/paper_plane-transformed.glb");
