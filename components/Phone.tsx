/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 phone.glb -t 
Author: maximlin (https://sketchfab.com/maksimlinchak006)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/iphone-14-low-poly-7940be3cb6044f009e4b190d546552ab
Title: Iphone 14 Low Poly
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube_Material001_0: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/phone.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group scale={0.01} rotation={[0, Math.PI/4 , 0]}>
        <mesh geometry={nodes.Cube_Material001_0.geometry} material={materials['Material.001']} position={[13.634, 0, 58.556]} rotation={[-Math.PI/2, 0, 0]} scale={[36.5, 76, 4]} />
      </group>
    </group>
  )
}

useGLTF.preload('/phone.glb')
