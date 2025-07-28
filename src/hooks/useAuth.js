// src/hooks/useAuth.js
import { useStateContext } from '../context/ContextProvider';

export const useAuth = () => {
  const { 
    user, 
    login, 
    logout, 
    checkAuth, 
    msg 
  } = useStateContext();

  return {
    user,
    login,
    logout,
    checkAuth,
    isAuthenticated: !!user,
    message: msg
  };
};
