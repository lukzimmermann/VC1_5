import React, { useRef, useState } from 'react';
import './App.css';
import View from '../Components/View/view';
import Selector from '../Components/Selector/selector';
import Lights from '../Components/Light/lights';
import { hoursToString, monthToString } from '../Utils/Utils';

function App() {
  const [time, setTime] = useState(new Date());
  const [lights, setLights] = useState(Lights);

  const hourChanged = (value) => {
    console.log(value);
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
          fun={hoursToString}
          onValueChange={hourChanged}
        />
        <Selector
          initialIndex={new Date().getMonth()}
          maxIndex={11}
          fun={monthToString}
          onValueChange={monthChanged}
        />
      </div>
      <div className="view">
        <View time={time} lights={lights} />
      </div>
    </div>
  );
}

export default App;
