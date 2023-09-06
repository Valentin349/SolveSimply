import Phone from "./Phone";
import Monitor from "./Monitor";
import { useRef, useState, useEffect } from "react";
import { Vector3 } from "three";


export default function DeviceScene() {
  const groupRef = useRef(); 
  const [scale, setScale] = useState(1); 
  const [phonePostition, setPhonePosition] = useState([-3, -1.1, 2.3]);


  useEffect(() => {
    const updateScaleAndPosition = () => {
      const aspect = Math.max(window.innerWidth / window.innerHeight, 0.5);
      let newScale = Math.pow(aspect, 0.45) * 0.1;
      newScale = aspect < 1.2 ? newScale + 0.5 : newScale + 0.8;
      setScale(newScale);

      if (aspect < 1.2) {
        setPhonePosition([-1.5, -1.1, 3.5]);
      } else {
        setPhonePosition([-3, -1.1, 2.3]);
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
    <group name="DeviceScene" scale={scale}>
      <ambientLight intensity={0.5}/>
      <group position={[0.3, 0, 0]}>
        <rectAreaLight
          rotation={[0, Math.PI, 0]}
          position={[-0.2, 0.3, 2.26]}
          width={3.6}
          height={2}
          intensity={8}
        />
        <Monitor />
      </group>

      <Phone position={vectorPhonePosition} />
    </group>
  );
}
