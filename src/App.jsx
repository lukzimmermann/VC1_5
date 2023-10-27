import React, { useRef, useState } from 'react';
import './App.css';
import View from './view';

function App() {
  return (
    <div>
      <p className="title">Wohnung</p>
      <div className="view">
        <View />
      </div>
    </div>
  );
}

export default App;
