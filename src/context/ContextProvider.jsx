import { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../services/authService";
import { useLoader } from "./LoaderContext";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("Admission");
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [scrollAnimatedSections, setScrollAnimatedSections] = useState({});
  const [isExpand, setIsExpand] = useState(true);
  const [email, setEmail] = useState("");
  const { setLoading } = useLoader();
  const [authActionInProgress, setAuthActionInProgress] = useState(false);

  const [authChecked, setAuthChecked] = useState(false);

  const checkAuth = async () => {
    if (!authActionInProgress) setLoading(true);
    setMsg("Checking authentication...");

    try {
      const result = await authService.checkAuth();
      if (result.success) {
        setUser(result.user);
        setMsg("Authenticated successfully");
      } else {
        setUser(null);
        setMsg("Not authenticated");
      }
    } catch (error) {
      setUser(null);
      console.log("Auth check failed:", error);
      setMsg("Authentication check failed");
    } finally {
      setAuthChecked(true);
      setTimeout(() => {
        if (!authActionInProgress) setLoading(false);
        setMsg("");
      }, 800);
    }
  };

  const login = async (credentials) => {
    setAuthActionInProgress(true);
    setLoading(true);
    setMsg("Logging in...");
    try {
      const result = await authService.login(credentials);

      if (result.success) {
        setUser(result.data.user);
        setMsg(result.message);

        return { success: true, message: result.message, data: result.data };
      } else {
        setMsg(result.message);
        return { success: false, message: result.message };
      }
    } catch (error) {
      const errorMessage = "Login failed. Please try again.";
      setMsg(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setTimeout(() => {
        setLoading(false);
        setAuthActionInProgress(false);
      }, 2000);
    }
  };


  // Logout function
  const logout = async () => {
    setAuthActionInProgress(true);
    setLoading(true);
    setMsg("Logging out...");
    try {
      await authService.logout();
      setUser(null);
      setMsg("Logged out successfully");
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
      setMsg("Logged out");
      return { success: true };
    } finally {
      setTimeout(() => {
        setLoading(false);
        setMsg("");
        setAuthActionInProgress(false);
      }, 1500);
    }
  };

  const register = async (credentials) => {
    setAuthActionInProgress(true);
    setLoading(true);
    setMsg("Registering...");
    try {
      const result = await authService.register(credentials);
      if (result.success) {
        setMsg(result.message);
        return { success: true, message: result.message };
      } else {
        setMsg(result.message);
        return { success: false, message: result.message };
      }
    } catch (error) {
      const errorMessage = "Register failed. Please try again.";
      setMsg(errorMessage);
      console.error("Register error:", error);
      return { success: false, message: errorMessage };
    } finally {
      setTimeout(() => {
        setLoading(false);
        setAuthActionInProgress(false);
      }, 2000);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
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
    email,
    setEmail,

    user,
    setUser,
    login,
    logout,
    checkAuth,
    register,
    authActionInProgress,
    authChecked,
  };

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
