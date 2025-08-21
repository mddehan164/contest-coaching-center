import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { loginData } from "../data/login&RegisterData";
import { useStateContext } from "../context/ContextProvider";
import Loader from "../components/Loader";
import { useLoader } from "../context/LoaderContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { msg, setMsg, user, login, authActionInProgress } = useStateContext();
  const { loading } = useLoader();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert("❌ Please fill in all fields");
      return;
    }
    if (form.password.length < 6) {
      alert("❌ Password must be at least 6 characters");
      return;
    }

    const result = await login(form);

    if (result.success) {
      if( user.role === "admin" || user.role === "superadmin" ){
        navigate("/dashboard");
      }else{
        navigate("/profile");
      }
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      setMsg("");
    }
  }, [user, setMsg]);

  return (
    <div className="flex justify-center items-center w-full flex-wrap px-1 sm:px-5 md:px-10 lg:px-20 xl:px-44 space-y-4 relative">
      {loading && !authActionInProgress && (
        <Loader message={msg} duration={2000} />
      )}
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
