// context/ContextProvider.jsx

import React, { createContext, useState, useContext } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('Admission');
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [scrollAnimatedSections, setScrollAnimatedSections] = useState({});
  const [isExpand, setIsExpand] = useState(true);


  return (
    <StateContext.Provider value={{
      isActiveMenu,
      setIsActiveMenu,
      activeTab,
      setActiveTab,
      scrollAnimatedSections,
      setScrollAnimatedSections,
      isExpand,
      setIsExpand,
      user,
      setUser,
      msg,
      setMsg,
      showConfirm,
      setShowConfirm,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
