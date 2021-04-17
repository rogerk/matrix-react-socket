import React from "react";
import { SocketContext, socket } from './context/socketContext';

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
    
    </SocketContext.Provider>
  )
}

export default App;
