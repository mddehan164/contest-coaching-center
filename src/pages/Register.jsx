import React, { useEffect, useState } from 'react'
import { registerData } from '../data/login&RegisterData';
import UserForm from '../components/userForm';
import { useStateContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';



const RegisterForm = () => {
    const navigate = useNavigate()
    const {msg, setMsg} = useStateContext();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.password.length > 6){
        alert("Password must be 6 charecters");
        return;
        }
        
        if (formData.password !== formData.password_confirmation) {
        alert("Passwords do not match");
        return;
        }
        

        else{
        setMsg("Registering...");
        }

        try {

        // Then call your register API
        const res = await api.post("/register", formData);

        if (res.status === 201 || res.status === 200) {
            setMsg(res.data.message);
            setTimeout(() => {
                navigate("/login");
                setMsg("")
            }, 2000);
        }
        } catch (err) {
        console.error(err);
        if (err.response?.data?.message) {
            setMsg("❌ " + err.response.data.message);
        } else {
            setMsg("❌ Registration failed");
        }
        }
    };
  return (
    <div className='flex justify-center items-center w-full xl:h-auto p-3 flex-wrap space-y-4'>
        {msg && <p className="mb-2 text-lg text-green-500 font-semibold w-full text-center">{msg}</p>}
        <h1 className='w-full text-xl font-semibold text-headerColor text-center'>Register</h1>
      <UserForm data={registerData} handleChange={handleChange} handleSubmit={handleSubmit}/>
    </div>
  )
}

export default RegisterForm
