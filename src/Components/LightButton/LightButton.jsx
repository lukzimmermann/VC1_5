import { useState } from 'react';
import './LightButton.css';

function LightButton(props) {
  const [state, setState] = useState(false);

  const buttonClick = () => {
    if (state) setState(false);
    else setState(true);
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
