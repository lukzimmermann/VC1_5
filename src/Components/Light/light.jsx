import { useEffect, useState } from 'react';

function Light(props) {
  const [lights, setLights] = useState(props.lights);

  useEffect(() => {
    console.log(props.lights[0].lights[0]);
    setLights(props.lights);
  }, [props]);

  return (
    <>
      {lights.map((room) =>
        room.lights.map((light) => (
          <pointLight
            key={light.id}
            position={light.coordinates}
            intensity={light.brightness / 50}
            color="#ffffcc"
          />
        ))
      )}
    </>
  );
}

export default Light;
