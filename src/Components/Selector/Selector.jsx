import { useState } from 'react';
import './Selector.css';

function Selector(props) {
  const [pointer, setPointer] = useState(props.initialIndex);
  const left = '<';
  const right = '>';

  const btnLeft = () => {
    if (pointer < 1) setPointer(props.list.length - 1);
    else setPointer(pointer - 1);
    valueChanged();
  };

  const btnRight = () => {
    if (pointer > props.list.length - 2) setPointer(0);
    else setPointer((prevPointer) => prevPointer + 1);
    valueChanged();
  };

  const valueChanged = () => {
    props.onValueChange(pointer);
  };

  return (
    <div className="main-container">
      <button className="btn-left" onClick={btnLeft}>
        {left}
      </button>
      <div className="value-box">{props.fun(props.list[pointer])}</div>
      <button className="btn-right" onClick={btnRight}>
        {right}
      </button>
    </div>
  );
}

export default Selector;
