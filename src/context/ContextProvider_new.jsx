// context/ContextProvider.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';
import { useLoader } from './LoaderContext';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('Admission');
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [scrollAnimatedSections, setScrollAnimatedSections] = useState({});
  const [isExpand, setIsExpand] = useState(true);
  const { setLoading } = useLoader();

  // Authentication check function
  const checkAuth = async () => {
    setLoading(true);
    setMsg("Checking authentication...");

    try {
      const result = await authService.checkAuth();
      
      if (result.success) {
        setUser(result.user);
        setMsg("✅ Authenticated successfully");
      } else {
        setUser(null);
        setMsg("❌ Not authenticated");
      }
    } catch (error) {
      setUser(null);
      console.log('❌ Auth check failed:', error);
      setMsg("❌ Authentication check failed");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setMsg("");
      }, 800);
    }
  };

  // Login function
  const login = async (credentials) => {
    setLoading(true);
    setMsg("Logging in...");

    try {
      const result = await authService.login(credentials);
      
      if (result.success) {
        setUser(result.data.user);
        setMsg(result.message);
        return { success: true, message: result.message };
      } else {
        setMsg(result.message);
        return { success: false, message: result.message };
      }
    } catch (error) {
      const errorMessage = "❌ Login failed. Please try again.";
      setMsg(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    setMsg("Logging out...");

    try {
      await authService.logout();
      setUser(null);
      setMsg("✅ Logged out successfully");
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout API fails, clear local state
      setUser(null);
      setMsg("✅ Logged out");
      return { success: true };
    } finally {
      setTimeout(() => {
        setLoading(false);
        setMsg("");
      }, 1500);
    }
  };

  // Check authentication on mount
  useEffect(() => {
    // Only check auth if we have a token
    if (authService.isAuthenticated()) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    // UI State
    isActiveMenu,
    setIsActiveMenu,
    activeTab,
    setActiveTab,
    scrollAnimatedSections,
    setScrollAnimatedSections,
    isExpand,
    setIsExpand,
    msg,
    setMsg,
    showConfirm,
    setShowConfirm,
    
    // Auth State & Functions
    user,
    setUser,
    login,
    logout,
    checkAuth,
  };

  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
