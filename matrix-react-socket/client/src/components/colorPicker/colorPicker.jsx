import React, { useContext, useEffect } from "react";
import { MatrixContext } from "../../context/matrixContext";

const ColorPicker = ({ handleColorChange }) => {
  const { color } = useContext(MatrixContext);

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
