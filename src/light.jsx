function Light(props) {
  let lightList = [];
  for (let i = 0; i < props.lights.length; i++) {
    for (let j = 0; j < props.lights[i].lights.length; j++) {
      if (!props.lights[i].lights[j].on) {
        props.lights[i].lights[j].brightness = 0;
      }
      lightList.push(props.lights[i].lights[j]);
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
}

export default Light;
