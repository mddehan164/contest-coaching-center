import React, { useEffect, useState } from 'react'
import { registerData } from '../data/login&RegisterData';
import UserForm from '../components/userForm';
import { useStateContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';
import Loader from '../components/Loader';



const RegisterForm = () => {
    const navigate = useNavigate()
    const {msg, setMsg, register, setEmail} = useStateContext();
    const {loading, setLoading} = useLoader();
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
        if(formData.password.length < 6){
        alert("❌ Password must be 6 charecters");
        setLoading(false);
        return;
        }
        
        if (formData.password !== formData.password_confirmation) {
        alert("❌ Passwords are not matching");
        setLoading(false);
        return;
        }

        const result = await register(formData);
        if (result.success) {
            setMsg(result.message);
            setEmail(formData.email);
            setTimeout(() => {
                navigate("/before-verify");
                setMsg("");
                setLoading(false);
            }, 2000);
        } else {
            setMsg(result.message);
            setTimeout(() => {
                setMsg("");
                setLoading(false);
            }, 2000);
        }

    };

    useEffect(() => {
        setMsg("");
        setLoading(false);
      }, [setMsg]);
  return (
    <div className='flex justify-center items-center w-full xl:h-auto p-3 flex-wrap space-y-4 relative'>
        {loading && <Loader message={msg} duration={3000} />}
        <h1 className='w-full text-xl font-semibold text-headerColor text-center'>Register</h1>
      <UserForm data={registerData} handleChange={handleChange} handleSubmit={handleSubmit}/>
    </div>
  )
}

export default RegisterForm
