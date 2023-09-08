import Phone from "./Phone";
import Monitor from "./Monitor";
import { useRef, useState, useEffect } from "react";
import { Vector3 } from "three";

export default function DeviceScene() {
  const [scale, setScale] = useState(1);
  const [phonePostition, setPhonePosition] = useState([-3, -1.1, 2.3]);

  useEffect(() => {
    const updateScaleAndPosition = () => {
      const aspect = Math.max(window.innerWidth / window.innerHeight, 0.5);
      let newScale = Math.pow(aspect, 0.45) * 0.1;
      newScale = aspect < 1.2 ? newScale + 0.56 : newScale + 0.9;
      setScale(newScale);

      if (aspect < 1.2) {
        setPhonePosition([-1.5, -1.15, 3.5]);
      } else {
        setPhonePosition([-2.5, -1.15, 2.3]);
      }
    };

    updateScaleAndPosition();
    window.addEventListener("resize", updateScaleAndPosition);

    return () => {
      window.removeEventListener("resize", updateScaleAndPosition);
    };
  }, []);

  const vectorPhonePosition = new Vector3(
    phonePostition[0],
    phonePostition[1],
    phonePostition[2]
  );

  return (
    <group>
      <group name="DeviceScene" scale={scale}>
        <mesh rotation-x={-Math.PI / 2} position={[0, -1.21, 3]} receiveShadow>
          <planeGeometry args={[70, 35]} />
          <meshStandardMaterial color={"#EAE7DC"} />
        </mesh>
        <ambientLight intensity={0.2} />
        <pointLight intensity={2} castShadow position={[0, 0.5, 2.3]} />
        <pointLight intensity={2} castShadow position={[0.5, 0.3, 2.3]} />

        <group position={[0.3, 0, 0]}>
          <rectAreaLight
            color={"#E98074"}
            rotation={[0, Math.PI, 0]}
            position={[-0.3, 0.55, 2.26]}
            width={2.3}
            height={2}
            intensity={1}
          />
          <Monitor />
        </group>
        <Phone position={vectorPhonePosition} />
      </group>
    </group>
  );
}
