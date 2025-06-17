import React, { createContext, useState, useContext } from 'react';

const StateContext = createContext();

const initialState = {
    isMenuOpen: false,
}

export const ContextProvider = ({ children }) => {
    const [isActiveMenu, setIsActiveMenu] = useState(false);
    return (
        <StateContext.Provider value={{
            isActiveMenu,
            setIsActiveMenu,
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);