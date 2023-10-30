import React, { useEffect, useState } from 'react';
import './App.css';
import View from '../Components/View/view';
import Selector from '../Components/Selector/selector';
import Lights from '../Components/Light/lights';
import { hoursToString, monthToString } from '../Utils/Utils';
import LightButton from '../Components/LightButton/LightButton';
import { getRooms } from '../Utils/hue';

function App() {
  const [time, setTime] = useState(new Date());
  const [lights, setLights] = useState(Lights);

  setInterval(updateLight, 1000);

  useEffect(() => {
    getLights();
  }, []);

  function updateLight() {
    setTime(new Date());
    getLights();
  }

  async function getLights() {
    const rooms = await await getRooms();
    setLights(rooms);
  }

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
    console.log(button);
    setLights((prevLights) =>
      prevLights.map((room) => {
        if (room.name === button.title) {
          const newBrightness = room.on ? 255 : 0;
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
  };

  return (
    <div>
      <p className="title">Wohnung</p>
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
