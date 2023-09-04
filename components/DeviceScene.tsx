import { CameraControls } from "@react-three/drei";
import Phone from "./Phone";
import Monitor from "./Monitor";


export default function DeviceScene() {
  
  return (
    <group name="DeviceScene">
      <ambientLight />
      {/* <pointLight position={[0, 0.5, 0]} intensity={4} /> */}
      
      <Monitor />
      <Phone position={[-3, -1.1, 2.3]}/>
    </group>
  );
}
