import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserForm from "../components/UserForm";
import { loginData } from "../data/login&RegisterData";
import { useStateContext } from "../context/ContextProvider";
import Loader from "../components/Loader";
import { useLoader } from "../context/LoaderContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { msg, setMsg, user, login } = useStateContext();
  const { loading, setLoading } = useLoader();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination or default to dashboard
  const from = location.state?.from?.pathname || "/profile";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(form);

    if (result.success) {
      // Redirect after successful login
      setTimeout(() => {
        navigate(from, { replace: true });
        setMsg("");
        setLoading(false);
      }, 2000);
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    setMsg("");
    setLoading(false);
  }, [setMsg, setLoading]);

  return (
    <div className="flex justify-center items-center w-full flex-wrap px-1 sm:px-5 md:px-10 lg:px-20 xl:px-44 space-y-4 relative">
      {loading && <Loader message={msg} duration={2000} />}
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
