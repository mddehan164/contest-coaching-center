// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { useLoader } from '../context/LoaderContext';
import Loader from './Loader';

const PrivateRoute = ({ children }) => {
  const { user } = useStateContext();
  const { loading } = useLoader();
  const location = useLocation();

  // Show loader while checking authentication
  if (loading) {
    return <Loader message="Checking authentication..." duration={0} />;
  }

  // If not authenticated, redirect to login with return url
  if (!user) {
    return <Navigate 
      to="/login" 
      state={{ from: location }} 
      replace 
    />;
  }

  // If authenticated, render the protected component
  return children;
};

export default PrivateRoute;
