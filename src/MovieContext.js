import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <MovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
      {children}
    </MovieContext.Provider>
  );
};
