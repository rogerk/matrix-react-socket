import React, { useContext, useCallback, useEffect } from "react";
import './pixel-styles.scss';
import { ColorContext } from "../../context/colorContext";
import { socket } from "../../context/socketContext";
import { UPDATE_PIXEL_COLOR } from "../../constants/event-types";


const Pixel = ({ pixel, handlePixelClick }) => {
  const { color, setColor } = useContext(ColorContext);


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
