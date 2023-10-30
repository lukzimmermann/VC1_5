import { useEffect, useState } from 'react';
import * as THREE from 'three';

function Light(props) {
  const [lights, setLights] = useState(props.lights);

  useEffect(() => {
    setLights(props.lights);
  }, [props]);

  return (
    <>
      {lights.map((room) =>
        room.lights.map((light) => (
          <pointLight
            key={light.id}
            position={light.coordinate}
            intensity={light.on ? light.brightness / 10000 : 0}
            color={new THREE.Color().fromArray(light.color)}
          />
        ))
      )}
    </>
  );
}

export default Light;
