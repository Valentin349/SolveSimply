import { useScroll } from "@react-three/drei";
import { RootState, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
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

export default function CameraController() {
  const scroll = useScroll();
  const [lastScrollPosition, setLastScrollPosition] = useState(scroll.offset);

  // globe scene
  const globeStartPoint = new THREE.Vector3(0, 0, 5);
  const globeControlPoint1 = new THREE.Vector3(0, 0, 2);
  const globeControlPoint2 = useRef(new THREE.Vector3()).current;
  const thresholdPosition = new THREE.Vector3(3, -0.4, 0);

  // monitor scene
  const devicesStartPoint = new THREE.Vector3(0, 8, 9);
  const devicesControlPoint1 = new THREE.Vector3(0, 1, 7);
  const devicesEndPoint = new THREE.Vector3(0, 0, 5);

  // phone scene
  const phoneStartPoint = new THREE.Vector3(0, 0, 5);
  const phoneStartLookPoint = new THREE.Vector3(0, 0, 0);
  const phoneEndPoint = new THREE.Vector3(-2.5, 0, 3.2);
  const phoneEndLookPoint = new THREE.Vector3(-2.5, -7, 3.2);
  const largeScreenPhoneEndPoint = new THREE.Vector3(-2.5, 0, 3.2);
  const largeScreenPhoneEndLookPoint = new THREE.Vector3(-2.5, -7, 3.2);

  // html scene
  const htmlStartPoint = phoneEndPoint;
  const htmlEndPoint = new THREE.Vector3(3, 0, 8);
  const htmlStartLookPoint = phoneEndLookPoint;
  const htmlEndLookPoint = new THREE.Vector3(3, -1, 8);
  const htmlEndPoint2 = new THREE.Vector3(3, 0, 10);

  const scene = useThree((state) => state.scene);
  const screenSize = useThree((state) => state.size);
  const [lastScreenSize, setLastScreenSize] = useState(screenSize);

  // update camera position in globe scene
  const updateGlobeScene = (state: RootState, scroll: number) => {
    const heroScene = scene.children[0];

    const globe = heroScene.children.find((item) => item.name === "globe");

    const groupPosition = globe!.position;

    globeControlPoint2.set(-groupPosition.x, -0.6 * groupPosition.y, 0);
    if (groupPosition.equals(thresholdPosition)) {
      globeControlPoint2.set(-3, 4, 0);
    }
    const endPoint = groupPosition;

    state.camera.position.copy(
      brazierCurve(
        scroll,
        globeStartPoint,
        globeControlPoint1,
        globeControlPoint2,
        endPoint
      )
    );

    state.camera.lookAt(
      brazierCurve(
        scroll + 0.01,
        globeStartPoint,
        globeControlPoint1,
        globeControlPoint2,
        endPoint
      )
    );
  };

  // update camera position in devices scene
  const updateDevicesScene = (state: RootState, scroll: number) => {
    state.camera.position.copy(
      brazierCurve(
        scroll,
        devicesStartPoint,
        devicesControlPoint1,
        devicesControlPoint1,
        devicesEndPoint
      )
    );

    state.camera.lookAt(
      brazierCurve(
        scroll,
        devicesStartPoint,
        devicesControlPoint1,
        devicesControlPoint1,
        devicesEndPoint
      )
    );
  };

  // update camera position in phone focus scene
  const phoneShot = (state: RootState, scroll: number) => {
    // update camera movement based on aspect ratio
    if (screenSize.width / screenSize.height < 1.2) {
      phoneEndPoint.set(-0.645, 0.1, 2.4);
      phoneEndLookPoint.set(-0.645, -2, 2.4);
    } else if (phoneEndLookPoint.equals(largeScreenPhoneEndPoint)!){
      phoneEndPoint.copy(largeScreenPhoneEndPoint);
      phoneEndLookPoint.copy(largeScreenPhoneEndLookPoint);
    }

    state.camera.position.copy(
      new THREE.Vector3().lerpVectors(phoneStartPoint, phoneEndPoint, scroll)
    );

    const lerpedLookAt = new THREE.Vector3().lerpVectors(
      phoneStartLookPoint,
      phoneEndLookPoint,
      scroll
    );
    state.camera.lookAt(lerpedLookAt);

    state.camera.rotateZ((Math.PI / 4) * scroll);
  };

  const htmlScene = (state: RootState, scrollRange: number) => {
    const contactRange = scroll.range(0.9, 0.1);
    
    if (screenSize.width / screenSize.height < 1.2) {
      htmlStartPoint.set(-0.645, 0.1, 2.4);
      htmlStartLookPoint.set(-0.645, -2, 2.4);
    } else {
      htmlStartPoint.copy(largeScreenPhoneEndPoint);
      htmlStartLookPoint.copy(largeScreenPhoneEndLookPoint);
    }
    
    if (contactRange === 0){
      state.camera.position.copy(
        new THREE.Vector3().lerpVectors(htmlStartPoint, htmlEndPoint, scrollRange)
      );

      state.camera.lookAt(new THREE.Vector3().lerpVectors(
        htmlStartLookPoint,
        htmlEndLookPoint,
        scrollRange
      ))
  
      state.camera.rotateZ((Math.PI / 4) * (1-scrollRange));
    } else {
      state.camera.position.copy(
        new THREE.Vector3().lerpVectors(htmlEndPoint, htmlEndPoint2, contactRange)
      );
    }

    
  }

  useFrame((state) => {
    // hide second scene at start
    if (scroll.offset === 0 && lastScrollPosition === 0) {
      scene.children[1].scale.set(0, 0, 0);
    }
    // only do calculations if scrolling has happenened or there is a change in screen size
    if (scroll.offset !== lastScrollPosition || screenSize !== lastScreenSize) {
      const heroScrollRange = scroll.range(0, 0.2);
      const deviceScrollRange = scroll.range(0.2, 0.1);
      const phoneScrollRange = scroll.range(0.5, 0.1);
      const productsRange = scroll.range(0.8, 0.1);

      if (productsRange > 0) {
        htmlScene(state, productsRange);
      } else if (phoneScrollRange > 0) {
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

      setLastScrollPosition(scroll.offset);
      if (screenSize !== lastScreenSize){
        setLastScreenSize(screenSize);
      }
    }
  });

  return null;
}
