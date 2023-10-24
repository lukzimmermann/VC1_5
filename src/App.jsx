import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useFBX } from '@react-three/drei';
import * as THREE from 'three';
import Sun from './sun';
import './App.css';

function App() {
  const time = new Date();
  time.setHours(18);
  time.setMinutes(0);
  time.setMonth(9);

  const Apartment = () => {
    let pos = new THREE.Vector3(0, 0, 0);
    const fbx = useFBX('WohnungVC.fbx');

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.3,
      ior: 1.5,
      envMapIntensity: 1,
      transmission: 0.5,
      opacity: 1,
    });

    if (fbx) {
      fbx.traverse((child) => {
        if (child.isMesh) {
          if (child.name === 'LampeRundWohnzimmer001') {
            console.log(child.position);
            pos.x = child.position.x / 250;
            pos.y = child.position.y / 250;
            pos.z = child.position.z / 250;
            child.material = material;
          }
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    return (
      <>
        <mesh castShadow receiveShadow>
          <primitive
            object={fbx}
            position={[0, 0, 0]}
            scale={0.004}
            castShadow
            receiveShadow
          />
          <shadowMaterial attach="material" opacity={0.3} />
        </mesh>
        {/*<mesh position={pos}>
          <sphereGeometry args={[0.1, 100, 100, 1]} />
          <meshStandardMaterial color="#ffff00" />
        </mesh>*/}
        <pointLight position={pos} intensity={4} color="#ffffCC" castShadow />
      </>
    );
  };

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
      <Sun time={time} />

      <Apartment receiveShadow castShadow />
    </Canvas>
  );
}

export default App;
