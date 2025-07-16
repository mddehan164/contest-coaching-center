import React from 'react'
import { registerData } from '../../data/login&RegisterData';
import UserForm from '../userForm';


const RegisterForm = () => {
  return (
    <div className='flex justify-center items-center w-full xl:h-auto p-3 flex-wrap'>
        <h1 className='w-full text-xl font-semibold text-headerColor text-center'>Register</h1>
      <UserForm data={registerData}/>
    </div>
  )
}

export default RegisterForm
