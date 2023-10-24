import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useFBX } from '@react-three/drei';
import * as THREE from 'three';
import { SunPosition } from './sunPosition';
import './App.css';

function App() {
  const time = new Date();
  //time.setHours(12);
  //time.setMonth(9);

  const rawSunPosition = SunPosition(15, time, -0.4);
  const sunPosition = [rawSunPosition[0], rawSunPosition[2], rawSunPosition[1]];
  let sunIntensity = rawSunPosition[2];
  if (sunIntensity < 0) sunIntensity = 0;

  const Scene = () => {
    const fbx = useFBX('WohnungVC.fbx');

    if (fbx) {
      fbx.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    return (
      <mesh castShadow receiveShadow>
        <primitive
          object={fbx}
          position={[-4, 0, 0]}
          scale={0.004}
          castShadow
          receiveShadow
        />
        <shadowMaterial attach="material" opacity={0.3} />
      </mesh>
    );
  };

  return (
    <Canvas
      className="canvas"
      shadows
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap; // Use soft shadows
      }}
    >
      <Scene receiveShadow castShadow />
      <mesh position={sunPosition}>
        <sphereGeometry args={[0.3, 100, 100, 1]} />
        <meshStandardMaterial color="#ffff00" />
      </mesh>

      <PerspectiveCamera makeDefault position={[0, 10, 15]} />
      <spotLight
        position={sunPosition}
        intensity={sunIntensity * 50}
        color="#FFF"
        castShadow
        penumbra={1}
      />
      <ambientLight intensity={sunIntensity * 0.2 + 0.3} />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
