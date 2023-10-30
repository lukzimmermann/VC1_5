import { useFBX } from '@react-three/drei';
import * as THREE from 'three';

const X_OFFSET = 4.4;

function Apartment() {
  let pos = new THREE.Vector3(0, 0, 0);
  const fbx = useFBX('WohnungVC2.fbx');

  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.3,
    ior: 1.5,
    envMapIntensity: 1,
    transmission: 0.5,
    opacity: 1,
  });
  const schrimMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xdad4b1,
    metalness: 0,
    roughness: 0.3,
    ior: 1.5,
    envMapIntensity: 1,
    transmission: 0.1,
    opacity: 1,
  });

  if (fbx) {
    fbx.traverse((child) => {
      if (child.isMesh) {
        if (child.name === 'LampeRundWohnzimmer001') {
          child.material = material;
        }
        if (
          child.name === 'LampenSchirm001' ||
          child.name === 'LampenSchirm002'
        ) {
          child.material = schrimMaterial;
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
}

export default Apartment;
