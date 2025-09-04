// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux-rtk/auth/authApi";
import { setCredentials, setAuthChecked } from "../redux-rtk/auth/authSlice";
import { setLoading, setMessage, clearUI } from "../redux-rtk/uiSlice";
import UserForm from "../components/UserForm";
import { loginData } from "../data/login&RegisterData";
import Loader from "../components/Loader";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { isLoading: uiLoading, message } = useSelector((state) => state.ui);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setMessage("Please Wait..."));

    if (!form.email || !form.password) {
      dispatch(setMessage("Please fill in all fields"));
      return;
    }

    if (form.password.length < 6) {
      dispatch(setMessage("Password must be at least 6 characters"));
      return;
    }

    try {
      dispatch(setLoading(true));
      const result = await login(form).unwrap();

      if (result.success) {
        dispatch(
          setCredentials({
            user: result.data.user,
            accessToken: result.data.access_token,
          })
        );
        dispatch(setAuthChecked());
        dispatch(setMessage(result.message));

        // Redirect based on role
        const redirectPath = ["admin", "superadmin"].includes(
          result.data.user.role
        )
          ? "/dashboard"
          : "/profile";

        navigate(redirectPath, { replace: true });
      }
    } catch (error) {
      dispatch(setMessage(error.data?.message || "Login failed"));
    } finally {
      setTimeout(() => dispatch(setLoading(false)), 1000);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = ["admin", "superadmin"].includes(user?.role)
        ? "/dashboard"
        : "/profile";
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    return () => dispatch(clearUI());
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center w-full flex-wrap px-1 sm:px-5 md:px-10 lg:px-20 xl:px-44 space-y-4 relative">
      {(isLoading || uiLoading) && <Loader message={message} />}

      <h1 className="w-full text-xl font-semibold text-headerColor text-center">
        Sign in
      </h1>

      <UserForm
        data={loginData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Login;
