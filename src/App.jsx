import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useFBX } from '@react-three/drei';
import * as THREE from 'three';
import Sun from './sun';
import './App.css';

const X_OFFSET = 4.4;

function App() {
  const lights = [
    {
      name: 'Wohnzimmer',
      lights: [
        {
          id: '4034',
          name: 'Wohnzimmer.001',
          on: true,
          brightness: 50,
          coordinates: [0.775, 0.5, 0.375],
        },
        {
          id: '4035',
          name: 'Wohnzimmer.002',
          on: true,
          brightness: 50,
          coordinates: [0.775, 1, 0.375],
        },
        {
          id: '4036',
          name: 'Wohnzimmer.003',
          on: true,
          brightness: 50,
          coordinates: [4.35, 0.5, 2.975],
        },
        {
          id: '4037',
          name: 'Wohnzimmer.004',
          on: true,
          brightness: 50,
          coordinates: [4.35, 1, 2.975],
        },
        {
          id: '4038',
          name: 'Wohnzimmer.005',
          on: true,
          brightness: 255,
          coordinates: [4.2, 0.64, 0.4],
        },
      ],
    },
    {
      name: 'Esstisch',
      lights: [
        {
          id: '4039',
          name: 'Esstisch.001',
          on: true,
          brightness: 255,
          coordinates: [0, 1.5, 2],
        },
      ],
    },
    {
      name: 'Kinderzimmer',
      lights: [
        {
          id: '4040',
          name: 'Kinderzimmer.001',
          on: false,
          brightness: 255,
          coordinates: [2.5, 1.5, -1.15],
        },
      ],
    },
    {
      name: 'Korridor',
      lights: [
        {
          id: '4041',
          name: 'Korridor.001',
          on: false,
          brightness: 255,
          coordinates: [0.15, 1.8, -2.25],
        },
        {
          id: '4042',
          name: 'Korridor.002',
          on: false,
          brightness: 255,
          coordinates: [-2, 1.8, 0.8],
        },
      ],
    },
    {
      name: 'Schlafzimmer',
      lights: [
        {
          id: '4043',
          name: 'Schlafzimmer.001',
          on: false,
          brightness: 255,
          coordinates: [0.85, 0.5, -3.75],
        },
        {
          id: '4044',
          name: 'Schlafzimmer.002',
          on: false,
          brightness: 255,
          coordinates: [0.85, 1, -3.75],
        },
        {
          id: '4045',
          name: 'Schlafzimmer.003',
          on: false,
          brightness: 255,
          coordinates: [4.25, 1, -4.75],
        },
      ],
    },
    {
      name: 'Büro',
      lights: [
        {
          id: '4046',
          name: 'Büro.001',
          on: true,
          brightness: 255,
          coordinates: [-4, 1, 1.8],
        },
        {
          id: '4047',
          name: 'Büro.002',
          on: true,
          brightness: 255,
          coordinates: [-4.9, 1.8, 2.5],
        },
      ],
    },
    {
      name: 'Küche',
      lights: [
        {
          id: '4093',
          name: 'Küche.001',
          on: false,
          brightness: 255,
          coordinates: [-2.65, 1, 2.75],
        },
      ],
    },
  ];

  const Lights = () => {
    let lightList = [];
    for (let i = 0; i < lights.length; i++) {
      for (let j = 0; j < lights[i].lights.length; j++) {
        if (!lights[i].lights[j].on) {
          lights[i].lights[j].brightness = 0;
        }
        lightList.push(lights[i].lights[j]);
      }
    }
    lightList.map((light) => console.log(light));

    return (
      <>
        {lightList.map((light) => (
          <pointLight
            position={light.coordinates}
            intensity={light.brightness / 50}
            color="#ffffdd"
          />
        ))}
      </>
    );
  };

  const time = new Date();
  time.setHours(23);
  time.setMinutes(0);
  time.setMonth(5);

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
            pos.x = child.position.x / 250 - X_OFFSET;
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
            position={[-X_OFFSET, 0, 0]}
            scale={0.004}
            castShadow
            receiveShadow
          />
          <shadowMaterial attach="material" opacity={0.3} />
        </mesh>
        <mesh position={[-2.65, 100, 2.75]}>
          <sphereGeometry args={[0.2, 100, 100, 1]} />
          <meshStandardMaterial color="#ffff00" />
        </mesh>
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
      <Lights />
      <Apartment receiveShadow castShadow />
    </Canvas>
  );
}

export default App;
