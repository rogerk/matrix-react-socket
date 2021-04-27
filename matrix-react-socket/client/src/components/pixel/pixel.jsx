import React, { useContext, useCallback, useEffect } from "react";
import './pixel-styles.scss';
import { MatrixContext } from "../../context/matrixContext";
import { socket } from "../../context/socketContext";
import { UPDATE_PIXEL_COLOR } from "../../constants/event-types";


const Pixel = ({ pixel, handlePixelClick }) => {
  const { color, setColor } = useContext(MatrixContext);


  // useEffect(() => {
  //   pixel.color = color;
  // }, color);

  return (
    <button
      className="pixel"
      style={{ background: pixel.color }}
      type="button"
      onClick={() => handlePixelClick({ pixel })}
    />
  );
};

export default Pixel;
