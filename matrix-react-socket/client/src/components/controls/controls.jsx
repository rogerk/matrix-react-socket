import React, { useContext, useEffect } from "react";
import { ColorContext } from "../../context/colorContext";
import ColorPicker from "../colorPicker/colorPicker";
import Reset from "../reset/reset";
import "./controls-styles.scss";
import { RESET_MATRIX_COLOR } from "../../constants/event-types";
import { SocketContext } from "../../context/socketContext";

const Controls = () => {
  const socket = useContext(SocketContext);
  const { color, setColor } = useContext(ColorContext);

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleReset = (event) => {
    socket.emit(RESET_MATRIX_COLOR, { color: color });
  };

  useEffect(() => {}, [color]);

  return (
    <div className="container">
      <div className="card border-muted w-75">
        <h5 className="cardTitle controls-container-text">Matrix Controls</h5>
        <div className="cardBody">
          <p className="cardText controls-container-text">
            To change the color of a pixel:
            <ul>
              <li>Select a color.</li>
              <li>Select a matrix pixel.</li>
            </ul>
            To change the color of all pixels:
            <ul>
              <li>Select a color.</li>
              <li>Press Reset.</li>
            </ul>
          </p>
        </div>

        <div className="controls-container">
          <ColorPicker handleColorChange={handleColorChange} />

          <Reset handleReset={handleReset} />
        </div>
      </div>
    </div>
  );
};

export default Controls;
