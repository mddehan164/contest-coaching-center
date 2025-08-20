import React, { useEffect, useState } from "react";
import { registerData } from "../data/login&RegisterData";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";
import Loader from "../components/Loader";
import UserForm from "../components/UserForm";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { msg, setMsg, register, setEmail, authActionInProgress } =
    useStateContext();
  const { loading } = useLoader();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      alert("❌ Password must be 6 charecters");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      alert("❌ Passwords are not matching");
      return;
    }

    const result = await register(formData);
    if (result.success) {
      setMsg(result.message);
      setEmail(formData.email);
      navigate("/before-verify");
    } else {
      setMsg(result.message);
    }
  };

  useEffect(() => {
    setMsg("");
  }, [setMsg]);
  return (
    <div className="flex justify-center items-center w-full xl:h-auto p-3 flex-wrap space-y-4 relative">
      {loading && !authActionInProgress && (
        <Loader message={msg} duration={2000} />
      )}
      <h1 className="w-full text-xl font-semibold text-headerColor text-center">
        Register
      </h1>
      <UserForm
        data={registerData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default RegisterForm;
