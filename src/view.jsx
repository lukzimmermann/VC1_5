import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useFBX } from '@react-three/drei';
import * as THREE from 'three';
import Sun from './sun';
import Apartment from './apartment';
import Light from './light';

function View(props) {
  return (
    <Canvas
      className="canvas"
      shadows
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <OrbitControls />
      <PerspectiveCamera makeDefault position={[0, 10, 15]} />
      <Sun time={props.time} />
      <Light lights={props.lights} />
      <Apartment receiveShadow castShadow />
    </Canvas>
  );
}

export default View;
