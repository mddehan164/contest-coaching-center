import React, { useState, useEffect, useCallback } from "react";
import { authService } from "../services/authService";
import { useLoader } from "./LoaderContext";
import Cookies from "js-cookie";

import { StateContext } from "./StateContext";

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

  const handleAuth = useCallback(
    async (checkOnly = false) => {
      setLoading(true);
      if (!checkOnly) {
        setMsg("Checking authentication...");
      }

      try {
        const accessToken = Cookies.get("access_token");
        const refreshToken = Cookies.get("refresh_token");

        if (!accessToken && !refreshToken) {
          setUser(null);
          return false;
        }

        const result = await authService.checkAuth();

        if (result.success) {
          setUser(result.user);
          if (!checkOnly) {
            setMsg("✅ Authenticated successfully");
          }
          return true;
        }

        // Try refreshing the token
        const refreshResult = await authService.refreshToken();
        if (refreshResult.success) {
          setUser(refreshResult.user);
          if (!checkOnly) {
            setMsg("✅ Session refreshed");
          }
          return true;
        }

        setUser(null);
        if (!checkOnly) {
          setMsg("❌ Session expired");
        }
        // Clear cookies on session expiry
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        return false;
      } catch (err) {
        console.error("Auth error:", err);
        setUser(null);
        if (!checkOnly) {
          setMsg("❌ Authentication failed");
        }
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        return false;
      } finally {
        if (!checkOnly) {
          setTimeout(() => {
            setLoading(false);
            setMsg("");
          }, 800);
        } else {
          setLoading(false);
        }
      }
    },
    [setLoading]
  );

  // Check auth state on mount and set up periodic checks
  useEffect(() => {
    let isActive = true;
    let refreshInterval;

    const initAuth = async () => {
      if (isActive) {
        await handleAuth();
      }
    };

    initAuth();

    // Check auth every 14 minutes
    refreshInterval = setInterval(() => {
      if (isActive) {
        handleAuth(true);
      }
    }, 14 * 60 * 1000);

    return () => {
      isActive = false;
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [handleAuth]);

  const login = useCallback(
    async (credentials) => {
      setLoading(true);
      setMsg("Logging in...");

      try {
        const result = await authService.login(credentials);

        if (result.success) {
          setUser(result.data.user);
          setMsg("✅ " + result.message);
          return { success: true, message: result.message };
        }

        setMsg("❌ " + result.message);
        return { success: false, message: result.message };
      } catch (err) {
        console.error("Login error:", err);
        const message = "Login failed. Please try again.";
        setMsg("❌ " + message);
        return { success: false, message };
      } finally {
        setTimeout(() => {
          setLoading(false);
          setMsg("");
        }, 800);
      }
    },
    [setLoading]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    setMsg("Logging out...");

    try {
      await authService.logout();
      setUser(null);
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      setMsg("✅ Logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
      setMsg("❌ Logout failed");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setMsg("");
      }, 800);
    }
  }, [setLoading]);

  const contextValue = {
    isActiveMenu,
    setIsActiveMenu,
    activeTab,
    setActiveTab,
    user,
    setUser,
    msg,
    setMsg,
    showConfirm,
    setShowConfirm,
    scrollAnimatedSections,
    setScrollAnimatedSections,
    isExpand,
    setIsExpand,
    email,
    setEmail,
    login,
    logout,
    handleAuth,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};
