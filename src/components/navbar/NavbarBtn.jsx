import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import User from "../User";
import ConfirmModal from "../ConfirmModal";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux-rtk/auth/authApi";
import { logout as logoutAction } from "../../redux-rtk/auth/authSlice";

const NavbarBtn = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutMutation] = useLogoutMutation();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleLogout = () => setShowConfirm(true);

  const confirmDelete = async () => {
    setLoading(true);
    setMsg("Logging out...");
    
    try {
      // Try to call logout API, but don't fail if it errors
      await logoutMutation().unwrap();
    } catch (error) {
      // Ignore API errors during logout
      console.log("Logout API call failed, but continuing with local logout");
    } finally {
      // Always clear local state regardless of API response
      dispatch(logoutAction());
      localStorage.clear();
      setShowConfirm(false);
      setLoading(false);
      setMsg("");
      navigate("/", { replace: true });
    }
  };

  const cancelDelete = () => setShowConfirm(false);

  return (
    <div>
      {!isAuthenticated && (
        <Link
          to="/login"
          className={`max-sm:py-2 max-sm:px-6 max-sm:rounded-none sm:py-2 sm:px-4 bg-${props.data.data.btnStyle.btnColor} px-6 py-4 text-white rounded-lg hover:bg-headerColorHover`}
        >
          {props.data.data.btnName}
        </Link>
      )}
      {loading && <Loader message={msg || "Processing..."} duration={2000} />}
      {isAuthenticated && <User logout={handleLogout} />}

      <ConfirmModal
        show={showConfirm}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="Are you sure you want to logout?"
      />
    </div>
  );
};

export default NavbarBtn;
