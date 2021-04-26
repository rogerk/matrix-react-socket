import React, { useContext, useEffect } from "react";
import { ColorContext } from "../../context/colorContext";

const ColorPicker = ({ handleColorChange }) => {
  const { color } = useContext(ColorContext);

  return (
    <div>
      <div>Color</div>
      <input
        name="color"
        type="color"
        value={color}
        onChange={handleColorChange}
      />
    </div>
  );
};

export default ColorPicker;
