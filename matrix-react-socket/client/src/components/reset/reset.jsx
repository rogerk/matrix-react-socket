import React from 'react';
import "./reset-styles.scss";

const Reset = ({ handleReset }) => {
  return (
    <button type="button" className="reset" onClick={handleReset}>
      Reset
    </button>
  );
};

  export default Reset;
