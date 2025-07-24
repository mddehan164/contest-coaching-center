import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import UserForm from '../components/userForm';
import { loginData } from '../data/login&RegisterData';
import api from "../../api/axiosInstance"
import { useStateContext } from '../context/ContextProvider';


const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const {msg, setMsg} = useStateContext()
  const navigate = useNavigate();
  const { setUser} = useStateContext();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Logging in...");

    try {
      // await api.get("/sanctum/csrf-cookie");
      const res = await api.post('/login', form);

      if (res.status === 200 || res.status === 201) {
        const user = res.data.data?.user;
        const accessToken = res.data.data?.access_token ;
        const refreshToken = res.data.data?.refresh_token;

        setMsg(res.data.message || "Login Successful");

        if (user) setUser(user);
        if (accessToken) localStorage.setItem("access_token", accessToken);
        if (refreshToken) localStorage.setItem("refresh_token", refreshToken);
        if (user) localStorage.setItem("user", JSON.stringify(user));

        setTimeout(() => {
          navigate("/"), 2000
          setMsg("")
        });
      }
    } catch (error) {
      console.error(error);
      setMsg("❌ Login failed. Try again.");
    }
    };
  useEffect(() => {
      setMsg(""); // clear any previous messages on mount
    }, [setMsg]);
  return (
      <div className='flex justify-center items-center w-full flex-wrap px-1 sm:px-5 md:px-10 lg:px-20 xl:px-44 space-y-4'>
         {msg && <p className="mb-2 text-lg text-headerColorHover font-semibold">{msg}</p>}
        <h1 className='w-full text-xl font-semibold text-headerColor text-center'>Sign in</h1>
      <UserForm data={loginData} handleChange={handleChange} handleSubmit={handleSubmit}/>
    </div>
  )
}

export default Login
