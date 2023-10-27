import { useFBX } from '@react-three/drei';
import * as THREE from 'three';

const X_OFFSET = 4.4;

function Apartment() {
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
}

export default Apartment;
