import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { useLoader } from '../context/LoaderContext';
import Loader from '../components/Loader';

const Logout = () => {
  const { logout, msg } = useStateContext();
  const { loading } = useLoader();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      const result = await logout();
      
      if (result.success) {
        // Redirect to login page after logout
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 1500);
      }
    };

    handleLogout();
  }, [logout, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      {loading && <Loader message={msg} duration={0} />}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Logging out...</h2>
        <p className="text-gray-500">Please wait while we log you out securely.</p>
      </div>
    </div>
  );
};

export default Logout;
