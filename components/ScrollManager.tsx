import { useScroll } from "@react-three/drei";
import { RootState, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const brazierCurve = (
  t: number,
  startPoint: THREE.Vector3,
  controlPoint1: THREE.Vector3,
  controlPoint2: THREE.Vector3,
  endPoint: THREE.Vector3
) => {
  const position = new THREE.Vector3();
  position.x =
    (1 - t) ** 3 * startPoint.x +
    3 * (1 - t) ** 2 * t * controlPoint1.x +
    3 * (1 - t) * t ** 2 * controlPoint2.x +
    t ** 3 * endPoint.x;
  position.y =
    (1 - t) ** 3 * startPoint.y +
    3 * (1 - t) ** 2 * t * controlPoint1.y +
    3 * (1 - t) * t ** 2 * controlPoint2.y +
    t ** 3 * endPoint.y;
  position.z =
    (1 - t) ** 3 * startPoint.z +
    3 * (1 - t) ** 2 * t * controlPoint1.z +
    3 * (1 - t) * t ** 2 * controlPoint2.z +
    t ** 3 * endPoint.z;

  return position;
};

const resetCamera = (state: RootState) => {
  state.camera.position.set(0,0,5);
  state.camera.lookAt(0,0,0);
};

export default function ScrollManager() {
  const scroll = useScroll();
  const scene = useThree((state) => state.scene);

  
  const updateGlobeScene = (state: RootState) => {
    const heroScene = scene.children;
    if (scroll.offset >= 0.5){
      heroScene[0].visible = false;
      resetCamera(state);
      heroScene[1].visible = true;
      
      return;  
    }
    
    heroScene[0].visible = true;
    heroScene[1].visible = false;

    const heroScrollRange = scroll.range(0, 1/2)

    const t = heroScrollRange;
    

    const globe = heroScene[0].children.find((item) => item.name === "globe")

    const groupPosition = globe!.position;

    const startPoint = new THREE.Vector3(0, 0, 5);
    const controlPoint1 = new THREE.Vector3(0, 0, 2);

    let controlPoint2 = new THREE.Vector3(
      -groupPosition.x,
      -0.6 * groupPosition.y,
      0
    );
    if (groupPosition.equals(new THREE.Vector3(3, -0.4, 0))) {
      controlPoint2 = new THREE.Vector3(-3, 4, 0);
    }
    const endPoint = groupPosition;

    state.camera.position.copy(
      brazierCurve(t, startPoint, controlPoint1, controlPoint2, endPoint)
    );

    state.camera.lookAt(
      brazierCurve(t + 0.01, startPoint, controlPoint1, controlPoint2, endPoint)
    );
  };

  useFrame((state) => {
    updateGlobeScene(state);
  });
  
  return null;
}
