import React, { useRef, useState } from 'react';
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
            <LightButton key={light.name} title={light.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
