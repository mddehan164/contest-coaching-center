import { div, input } from 'motion/react-m'
import React from 'react'
import { NavLink } from 'react-router';
import MainBtn from "./MainBtn"

const UserForm = ({data}) => {
  return (
    <div className='w-full sm:w-1/2 xl:w-1/3 sm:px-5 md:px-7 lg:px-10 xl:px-14 xl:py-10 px-2 py-5 bg-contestLight rounded-md shadow-md border-none'>
      <h1 className='text-2xl text-center text-headerColorHover font-semibold'>{data.title}</h1>
      <h3 className='text-sm mt-3 text-center'>{data.subtitle}</h3>
      {
        data.fields.map((field, idx) => (<div key={idx}><input placeholder={field.placeholder} type={field.type} className='py-3 rounded-md mt-5 w-full px-2 text-headerColorHover outline-none shadow-sm'/> <br/></div>))
      }
        <div  className="my-3 p-1">
            <MainBtn
                data={data.btnData.btnName}
                btnStyle={data.btnData.btnStyle}
            />
        </div>
      <p className='text-center m-1 text-headerColorHover font-medium text-sm'>{data.bottomText}<NavLink to={data.route} className='text-headerColor hover:text-headerColorHover cursor-pointer'>{data.spanText} </NavLink></p>
    </div>
  )
}

export default UserForm
