import { SunPosition } from './sunPosition';
import './App.css';

function Sun() {
  const time = new Date();
  time.setHours(7);
  time.setMonth(5);

  const rawSunPosition = SunPosition(15, time, -0.4);
  const sunPosition = [rawSunPosition[0], rawSunPosition[2], rawSunPosition[1]];
  let sunIntensity = rawSunPosition[2];
  if (sunIntensity < 0) sunIntensity = 0;

  return (
    <>
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
    </>
  );
}

export default Sun;
