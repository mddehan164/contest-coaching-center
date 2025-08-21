import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStateContext } from "../context/useStateContext";
import { useLoader } from "../context/LoaderContext";
import Loader from "./Loader";

const AdminRoute = ({ children }) => {
  const { user, handleAuth } = useStateContext();
  const { loading } = useLoader();
  const location = useLocation();

  // Check auth status when component mounts
  useEffect(() => {
    if (!user) {
      handleAuth();
    }
  }, [handleAuth, user]);

  // Show loader while checking authentication
  if (loading) {
    return <Loader message="Checking access..." duration={0} />;
  }

  // If not authenticated or not an admin, redirect to home
  if (!user || user.role !== "admin") {
    return (
      <Navigate
        to="/login"
        state={{ from: location, message: "Access denied: Admin only area" }}
        replace
      />
    );
  }

  // If authenticated and admin, render the protected component
  return children;
};

export default AdminRoute;
