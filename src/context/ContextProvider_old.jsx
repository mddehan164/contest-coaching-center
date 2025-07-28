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
  const {setLoading} = useLoader();
  // const accessToken = localStorage.getItem("access_token");

// this is for Sanctum authentication
const checkAuth = async () => {
  setLoading(true);
  setMsg("Checking authentication...");

  try {
    // 1. Get CSRF cookie
    await getCsrfToken(); // ❗ Must be called first (no auth required)

    // 2. Then check if user is authenticated
    const response = await api.get("/me"); // expects Sanctum to find user via cookie

    if (response.status === 200) {
      setUser(response.data.data.user);
      setMsg("✅ Authenticated successfully");
    } else {
      setUser(null);
      setMsg("❌ Not authenticated");
    }
  } catch (err) {
    setUser(null);
    console.log('❌ Auth check failed:', err);
    setMsg("❌ Not authenticated");
  } finally {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }
};

  useEffect(() => {
    checkAuth()
  }, []); // ✅ Call checkAuth on mount

// this is access token based authentication
//   const checkAuth = async () => {
//   setLoading(true); // ✅ শুরুতেই loader চালাও
//   setMsg("Checking authentication...");

//   try {
//     const response = await api.get('/me');

//     if (response.status === 200) {
//       setUser(response.data.data.user);
//       setMsg("✅ Authenticated successfully");
//     }
//   } catch (err) {
//     setMsg('❌ Network Error !', err.message);
//     setUser(null);
//     console.log('❌ Auth check failed:', err);
//   } finally {
//     setTimeout(() => {
//       setLoading(false); // ✅ যেকোনো অবস্থায় loader বন্ধ
//     }, 1000); // Optional delay to show spinner smoothly
//   }
// };


//   useEffect(() => {
//     if (accessToken) {
//       checkAuth();
//     }
//   }, []);


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
