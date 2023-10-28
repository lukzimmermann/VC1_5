import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useFBX } from '@react-three/drei';
import * as THREE from 'three';
import Sun from '../Sun/sun';
import Apartment from '../Apartment/apartment';
import Light from '../Light/light';
import { useEffect, useState } from 'react';
import './view.css';
import Lights from '../Light/lights';

function View(props) {
  const [time, setTime] = useState(new Date());
  const [lights, setLights] = useState(Lights);

  useEffect(() => {
    setTime(props.time);
    setLights(props.lights);
  }, [props]);

  return (
    <Canvas
      className="view2"
      shadows
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <OrbitControls />
      <PerspectiveCamera makeDefault position={[0, 10, 15]} />
      <Sun time={time} />
      <Light lights={lights} />
      <Apartment receiveShadow castShadow />
    </Canvas>
  );
}

export default View;
