import { useState, useEffect } from 'react';
import './LightButton.css';

function LightButton(props) {
  const [state, setState] = useState(props.on);

  const buttonClick = () => {
    if (state) setState(false);
    else setState(true);
    props.onClick(props);
  };

  return (
    <button
      className={state ? 'light-button active-button' : 'light-button'}
      onClick={buttonClick}
    >
      <p
        className={
          state ? 'light-button-text active-text' : 'light-button-text'
        }
      >
        {props.title}
      </p>
    </button>
  );
}

export default LightButton;
