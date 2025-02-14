import React, { createContext, useContext, useState, useRef } from 'react';

const KanjiContext = createContext();

export const KanjiProvider = ({ children }) => {
    const [currentHealth, setCurrentHealth] = useState(0);

  return (
    <KanjiContext.Provider value={{ currentHealth, setCurrentHealth}}>
      {children}
    </KanjiContext.Provider>
  );
};

export const useKanjiContext = () => useContext(KanjiContext);