import { SunPosition } from './sunPosition';

function Sun(props) {
  let time = new Date();
  if (props.time != null) {
    time = props.time;
  }

  const rawSunPosition = SunPosition(15, time, -0.3);
  const sunPosition = [
    rawSunPosition[0] - 4,
    rawSunPosition[2],
    rawSunPosition[1],
  ];
  let sunIntensity = rawSunPosition[2];
  if (sunIntensity < 0) sunIntensity = 0;

  return (
    <>
      <mesh position={sunPosition}>
        <sphereGeometry args={[0.3, 100, 100, 1]} />
        <meshStandardMaterial color="#ffff00" />
      </mesh>
      <ambientLight intensity={sunIntensity * 0.1 + 0.3} />
      <spotLight
        position={sunPosition}
        intensity={sunIntensity * 40}
        color="#FFF"
        castShadow
      />
    </>
  );
}

export default Sun;
