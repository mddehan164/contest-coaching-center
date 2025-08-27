import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../redux-rtk/auth/authApi';
import { logout as logoutAction } from '../redux-rtk/auth/authSlice';
import { setLoading, setMessage } from '../redux-rtk/uiSlice';
import Loader from '../components/Loader';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutMutation] = useLogoutMutation();
  const { isLoading, message } = useSelector(state => state.ui);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setMessage('Logging out...'));
        
        // Call the API logout endpoint
        await logoutMutation().unwrap();
        
        // Clear Redux state
        dispatch(logoutAction());
        dispatch(setMessage('Logged out successfully'));
        
        // Redirect to login page after logout
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 1500);
      } catch (error) {
        // Even if API fails, still clear local state
        dispatch(logoutAction());
        dispatch(setMessage('Logged out'));
        
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 1500);
      } finally {
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 1500);
      }
    };

    handleLogout();
  }, [dispatch, navigate, logoutMutation]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      {isLoading && <Loader message={message} duration={0} />}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Logging out...</h2>
        <p className="text-gray-500">Please wait while we log you out securely.</p>
      </div>
    </div>
  );
};

export default Logout;
