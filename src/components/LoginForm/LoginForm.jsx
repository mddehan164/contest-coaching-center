import React from 'react'
import UserForm from "../userForm.jsx";
import { loginData } from '../../data/login&RegisterData.js';

const LoginForm = () => {
  return (
    <div className='flex justify-center items-center w-full h-[55vh] xl:h-[52vh] p-3 flex-wrap'>
        <h1 className='w-full text-xl font-semibold text-headerColor text-center'>Sign in</h1>
      <UserForm data={loginData}/>
    </div>
  )
}

export default LoginForm
