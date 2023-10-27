import React, { useRef, useState } from 'react';
import './App.css';
import View from '../Components/View/view';
import Selector from '../Components/Selector/selector';

function App() {
  const [time, setTime] = useState(new Date());

  const lights = [
    {
      name: 'Wohnzimmer',
      lights: [
        {
          id: '4034',
          name: 'Wohnzimmer.001',
          on: true,
          brightness: 50,
          coordinates: [0.775, 0.5, 0.375],
        },
        {
          id: '4035',
          name: 'Wohnzimmer.002',
          on: true,
          brightness: 50,
          coordinates: [0.775, 1, 0.375],
        },
        {
          id: '4036',
          name: 'Wohnzimmer.003',
          on: true,
          brightness: 50,
          coordinates: [4.35, 0.5, 2.975],
        },
        {
          id: '4037',
          name: 'Wohnzimmer.004',
          on: true,
          brightness: 50,
          coordinates: [4.35, 1, 2.975],
        },
        {
          id: '4038',
          name: 'Wohnzimmer.005',
          on: false,
          brightness: 255,
          coordinates: [4.2, 0.64, 0.4],
        },
      ],
    },
    {
      name: 'Esstisch',
      lights: [
        {
          id: '4039',
          name: 'Esstisch.001',
          on: false,
          brightness: 255,
          coordinates: [0, 1.5, 2],
        },
      ],
    },
    {
      name: 'Kinderzimmer',
      lights: [
        {
          id: '4040',
          name: 'Kinderzimmer.001',
          on: false,
          brightness: 255,
          coordinates: [2.5, 1.5, -1.15],
        },
      ],
    },
    {
      name: 'Korridor',
      lights: [
        {
          id: '4041',
          name: 'Korridor.001',
          on: false,
          brightness: 255,
          coordinates: [0.15, 1.8, -2.25],
        },
        {
          id: '4042',
          name: 'Korridor.002',
          on: false,
          brightness: 255,
          coordinates: [-2, 1.8, 0.8],
        },
      ],
    },
    {
      name: 'Schlafzimmer',
      lights: [
        {
          id: '4043',
          name: 'Schlafzimmer.001',
          on: false,
          brightness: 255,
          coordinates: [0.85, 0.5, -3.75],
        },
        {
          id: '4044',
          name: 'Schlafzimmer.002',
          on: false,
          brightness: 255,
          coordinates: [0.85, 1, -3.75],
        },
        {
          id: '4045',
          name: 'Schlafzimmer.003',
          on: false,
          brightness: 255,
          coordinates: [4.25, 1, -4.75],
        },
      ],
    },
    {
      name: 'Büro',
      lights: [
        {
          id: '4046',
          name: 'Büro.001',
          on: false,
          brightness: 255,
          coordinates: [-4, 1, 1.8],
        },
        {
          id: '4047',
          name: 'Büro.002',
          on: false,
          brightness: 255,
          coordinates: [-4.9, 1.8, 2.5],
        },
      ],
    },
    {
      name: 'Küche',
      lights: [
        {
          id: '4093',
          name: 'Küche.001',
          on: true,
          brightness: 255,
          coordinates: [-2.65, 1, 2.75],
        },
      ],
    },
  ];

  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  const monthsIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const hoursToString = (hour) => {
    if (hour > 9) return hour + ':00';
    else return '0' + hour + ':00';
  };

  const monthToString = (month) => {
    return months[month];
  };

  const hourChanged = (value) => {
    const newTime = new Date(time);
    newTime.setHours(value);
    setTime(newTime);
    console.log(time);
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
          list={hours}
          initialIndex={new Date().getHours()}
          fun={hoursToString}
          onValueChange={hourChanged}
        />
        <Selector
          list={monthsIndex}
          initialIndex={new Date().getMonth()}
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
