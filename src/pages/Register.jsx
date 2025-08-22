import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux-rtk/auth/authApi";
import { setLoading, setMessage, clearUI, setEmail } from "../redux-rtk/uiSlice";
import { registerData } from "../data/login&RegisterData";
import Loader from "../components/Loader";
import UserForm from "../components/UserForm";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const { isLoading: uiLoading, message } = useSelector(state => state.ui);
  
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
      dispatch(setMessage("❌ Password must be 6 characters"));
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      dispatch(setMessage("❌ Passwords are not matching"));
      return;
    }

    try {
      dispatch(setLoading(true));
      const result = await registerMutation(formData).unwrap();
      
      if (result.success) {
        dispatch(setMessage(result.message));
        dispatch(setEmail(formData.email));
        navigate("/before-verify");
      }
    } catch (error) {
      dispatch(setMessage(error.data?.message || "Registration failed"));
    } finally {
      setTimeout(() => dispatch(setLoading(false)), 2000);
    }
  };

  useEffect(() => {
    return () => dispatch(clearUI());
  }, [dispatch]);
  return (
    <div className="flex justify-center items-center w-full xl:h-auto p-3 flex-wrap space-y-4 relative">
      {(isLoading || uiLoading) && (
        <Loader message={message} duration={2000} />
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
