// context/ContextProvider.jsx

import React, { createContext, useState, useContext } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('Admission');

  // scroll animation state (optional, future extensibility)
  const [scrollAnimatedSections, setScrollAnimatedSections] = useState({});

  return (
    <StateContext.Provider value={{
      isActiveMenu,
      setIsActiveMenu,
      activeTab,
      setActiveTab,
      scrollAnimatedSections,
      setScrollAnimatedSections,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
