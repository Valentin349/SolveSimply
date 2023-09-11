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

export default function ScrollManager() {
  const scroll = useScroll();
  const scene = useThree((state) => state.scene);
  const screenSize = useThree((state) => state.size);

  const updateGlobeScene = (state: RootState, scroll: number) => {
    const heroScene = scene.children[0];

    const globe = heroScene.children.find((item) => item.name === "globe");

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
      brazierCurve(scroll, startPoint, controlPoint1, controlPoint2, endPoint)
    );

    state.camera.lookAt(
      brazierCurve(
        scroll + 0.01,
        startPoint,
        controlPoint1,
        controlPoint2,
        endPoint
      )
    );
  };

  const updateDevicesScene = (state: RootState, scroll: number) => {
    const startPoint = new THREE.Vector3(0, 8, 9);
    const controlPoint1 = new THREE.Vector3(0, 1, 7);
    const endPoint = new THREE.Vector3(0, 0, 5);

    state.camera.position.copy(
      brazierCurve(scroll, startPoint, controlPoint1, controlPoint1, endPoint)
    );

    state.camera.lookAt(
      brazierCurve(scroll, startPoint, controlPoint1, controlPoint1, endPoint)
    );
  };

  const phoneShot = (state: RootState, scroll: number) => {
    const startPoint = new THREE.Vector3(0, 0, 5);
    const startLookPoint = new THREE.Vector3(0,0,0);
    
    let endPoint = new THREE.Vector3(-2.5, 0, 3.2);
    let endLookPoint = new THREE.Vector3(-2.5, -7, 3.2);

    if (screenSize.width / screenSize.height < 1.2) {
      endPoint = new THREE.Vector3(-0.645, 0.1, 2.4);
      endLookPoint = new THREE.Vector3(-0.645, -2, 2.4);
    } 
    
    state.camera.position.copy(
      new THREE.Vector3().lerpVectors(startPoint, endPoint, scroll)
    );
       
    const lerpedLookAt = new THREE.Vector3().lerpVectors(startLookPoint, endLookPoint, scroll);
    state.camera.lookAt(lerpedLookAt);
    
    state.camera.rotateZ(Math.PI/4 * scroll)
  };

  useFrame((state) => {
    const heroScrollRange = scroll.range(0, 0.2);
    const deviceScrollRange = scroll.range(0.2, 0.2);
    const phoneScrollRange = scroll.range(0.6, 0.2);

    if (phoneScrollRange > 0) {
      phoneShot(state, phoneScrollRange);
    } else if (deviceScrollRange > 0) {
      scene.children[0].scale.set(0, 0, 0);
      scene.children[1].scale.set(1, 1, 1);
      updateDevicesScene(state, deviceScrollRange);
    } else {
      scene.children[0].scale.set(1, 1, 1);
      scene.children[1].scale.set(0, 0, 0);
      updateGlobeScene(state, heroScrollRange);
    }
  });

  return null;
}