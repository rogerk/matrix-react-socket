import React from 'react';

export const ColorContext = React.createContext({
  color: '#FFFFFF',
  setColor: () => { },
  error: "",
  setError: () => { }
});