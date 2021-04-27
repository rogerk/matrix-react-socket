import React, { useState, useEffect } from "react";
import { SocketContext, socket } from "./context/socketContext";
import { MatrixContext } from "./context/matrixContext";
import Controls from "./components/controls/controls";
import Matrix from "./components/matrix/matrix";

const App = () => {
  const [color, setColor] = useState("#FFFFFF");
  const [error, setError] = useState("");

  return (
    <div>
      <SocketContext.Provider value={socket}>
        <MatrixContext.Provider value={{ color, setColor, error, setError }}>
          <div class="error-message">{error}</div>
          <div className="container">
            <div className="row">
              <div>
                <Matrix />
              </div>
              <div className="col-sm">
                <Controls />
              </div>
            </div>
          </div>
        </MatrixContext.Provider>
      </SocketContext.Provider>
    </div>
  );
};

export default App;
