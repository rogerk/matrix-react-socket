import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { SocketContext } from "../../context/socketContext";
import { ColorContext } from "../../context/colorContext";
import "./matrix-styles.scss";
import Pixel from "../pixel/pixel";
import {
  INITIAL_MATRIX,
  ALL_MATRIX,
  MATRIX_COLOR_RESET,
  UPDATE_PIXEL_COLOR,
  PIXEL_COLOR_UPDATE,
  SERVER_ERROR
} from "../../constants/event-types";

const Matrix = () => {
  const socket = useContext(SocketContext);
  const { color, error, setError} = useContext(ColorContext);
  const [pixels, setPixels] = useState([]);
  const [rowMarkup, setRowMarkup] = useState([]);
  const prevPixels = useRef();

  const buildMatrix = useCallback(() => {
    let markup = [],
      cols = [],
      index = 0;
    for (let pixel of pixels) {
      cols.push(
        <Pixel
          key={pixel.id}
          pixel={pixel}
          handlePixelClick={handlePixelClick}
        />
      );
      if ((index + 1) % 8 === 0) {
        markup.push(
          <div className="row" key={index}>
            {cols}
          </div>
        );
        cols = [];
      }
      index++;
    }
    setRowMarkup(markup);
  });

  const handlePixelClick = useCallback((pixel) => {
    socket.emit(UPDATE_PIXEL_COLOR, { pixel: pixel, color: color });
  });

  useEffect(() => {
    socket.emit(INITIAL_MATRIX, );
    socket.on(ALL_MATRIX, (data) => {
      setPixels(data);
    });
    socket.on(MATRIX_COLOR_RESET, (data) => {
      setPixels(data);
    });
    socket.on(PIXEL_COLOR_UPDATE, (data) => {
      const newPixels = [...prevPixels.current];
      let idx = newPixels.findIndex((pixel) => pixel.id === data.id);
      newPixels[idx] = data;
      setPixels(newPixels);
    });
    socket.on(SERVER_ERROR, (error) => {
      setError(error);
    });
    socket.on('connect_error', (error) => {
      setError("Could not connect to server.");
    });
    socket.on("connect", () => {
      setError("");
    });
    
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  useEffect(() => {
    buildMatrix();
    prevPixels.current = pixels;
  }, [pixels, color]);

  return (
    <div className="card border-dark">
      <div className="cardBody">
        <div className="container-fluid">{rowMarkup}</div>
      </div>
    </div>
  );
};

export default Matrix;
