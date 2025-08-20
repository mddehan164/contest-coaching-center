import React, { useEffect } from 'react'
import { useStateContext } from '../../context/ContextProvider';
import ConfirmModal from "../ConfirmModal"
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import { useLoader } from '../../context/LoaderContext';
import User from '../User';

const NavbarBtn = (props) => {
  const {showConfirm , setShowConfirm, setMsg, user, setUser, msg, logout} = useStateContext();
  const {loading, setLoading} = useLoader();

  const handleLogout = async () => {
    setShowConfirm(true)
  };

  const confirmDelete = async() => {
    try {
    await logout();
    localStorage.clear();
    setUser(null);
    setShowConfirm(false);
    setMsg("Logged out successfully");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMsg("");
    }, 2000);
  } catch (err) {

    setMsg("❌ Logout failed. Try again.");
    setTimeout(() => {
      setMsg("");
    }, 2000);
  }};

  const cancelDelete = () => {
    setShowConfirm(false);
  };
  useEffect(() =>{
    setMsg("");
    setLoading(false);
  }, [setMsg, setLoading]);
  return (
    <div>

      {!user && (<Link to="/login"  className={`max-sm:py-2 max-sm:px-6 max-sm:rounded-none sm:py-2 sm:px-4 bg-${!user ? props.data.data.btnStyle.btnColor : "transparent"} px-6 py-4 text-white rounded-lg ${!user ? "hover:bg-headerColorHover" : " "}`}>{props.data.data.btnName}</Link>)}
      { loading &&(
        <Loader message={msg} duration={2000} />
      )}
        {user && (
          <User logout={handleLogout}/>
        )}

        <ConfirmModal
          show={showConfirm}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          message="Are you sure you want to logout?"
        />
    </div>
  )
}

export default NavbarBtn
