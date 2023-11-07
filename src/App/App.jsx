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
      <h1 className="title">Meine Wohnung</h1>
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
    </div>
  );
}

export default App;
