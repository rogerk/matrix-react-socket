import React from 'react';

export const MatrixContext = React.createContext({
  color: '#FFFFFF',
  setColor: () => { },
  error: "",
  setError: () => { }
});