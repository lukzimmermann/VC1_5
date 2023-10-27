import { useEffect, useState } from 'react';
import './Selector.css';

function Selector(props) {
  const [pointer, setPointer] = useState(props.initialIndex);
  const left = '<';
  const right = '>';

  useEffect(() => {
    props.onValueChange(pointer);
  }, [pointer]);

  const btnLeft = () => {
    if (pointer < 1) setPointer(props.maxIndex - 1);
    else setPointer((prevPointer) => prevPointer - 1);
  };

  const btnRight = () => {
    if (pointer > props.maxIndex - 2) setPointer(0);
    else setPointer((prevPointer) => prevPointer + 1);
  };

  return (
    <div className="main-container">
      <button className="btn-left" onClick={btnLeft}>
        {left}
      </button>
      <div className="value-box">{props.fun(pointer)}</div>
      <button className="btn-right" onClick={btnRight}>
        {right}
      </button>
    </div>
  );
}

export default Selector;
