import React, { useEffect, useState } from 'react';
import './App.css';
import View from '../Components/View/view';
import Selector from '../Components/Selector/selector';
import Lights from '../Components/Light/lights';
import { hoursToString, monthToString } from '../Utils/Utils';
import LightButton from '../Components/LightButton/LightButton';

function App() {
  const [time, setTime] = useState(new Date());
  const [lights, setLights] = useState(Lights);

  const hourChanged = (value) => {
    const newTime = new Date(time);
    newTime.setHours(value);
    setTime(newTime);
  };

  const monthChanged = (value) => {
    const newTime = new Date(time);
    newTime.setMonth(value);
    setTime(newTime);
  };

  const handleClick = (button) => {
    console.log(button.title);
    setLights((prevLights) =>
      prevLights.map((room) => {
        if (room.name === button.title) {
          const newBrightness = room.on ? 0 : 100;
          return {
            ...room,
            on: !room.on,
            lights: room.lights.map((light) => ({
              ...light,
              brightness: newBrightness,
              on: !room.on,
            })),
          };
        }
        return room;
      })
    );
    console.log(lights);
  };

  return (
    <div>
      <h1 className="title">My apartment</h1>
      <div className="selector-container">
        <Selector
          initialIndex={new Date().getHours()}
          maxIndex={23}
          width={45}
          fun={hoursToString}
          onValueChange={hourChanged}
        />
        <Selector
          initialIndex={new Date().getMonth()}
          maxIndex={11}
          width={80}
          fun={monthToString}
          onValueChange={monthChanged}
        />
      </div>
      <div className="view">
        <View time={time} lights={lights} />
      </div>
      <div className="light-button-container">
        <div className="light-button-scroll">
          {lights.map((light) => (
            <LightButton
              key={light.id}
              roomId={light.id}
              title={light.name}
              on={light.on}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>
      <div class="decripton-container">
        <p></p>
        <h3>Description</h3>
        <p>
          This is a representation of my apartment created in blender. You can
          set the time and the month. The position of the sun is calculated and
          therefore also the lighting conditions. You can also switch all the
          lights in the apartment on and off. This project will also be used to
          create a dashboard at the entrance to the apartment using a
          touchscreen. It currently has the function of controlling and
          visualizing the Phillips Hue lighting system. The color and brightness
          are also currently displayed.
          <br />
          <br />
          <br />
        </p>
        <h3>TechStack</h3>
        <p>
          The project was created with React. React-three-fiber was used instead
          of Three.js. This makes it possible to use Three.js in a React
          application and with all the advantages of React.
          <br />
          <br />
          <a href="https://github.com/lukzimmermann/VC1_5">Github Repository</a>
        </p>
      </div>
    </div>
  );
}

export default App;
