import React from 'react'
import { Link } from 'react-router-dom';


const CustomCard = ({data}) => {
    const {icon: Icon, name, link} = data
  return (
    <div className=''>
        <Link to={`/dashboard/${link}`} className='border flex items-center gap-2 max-w-[280px] px-2 py-2 text-headerColorHover rounded-md hover:shadow-md hover:scale-105 transition-all duration-75'>
            <Icon/>
            <h5 className='hover:text-contestRed hover:underline'>{name}</h5>
        </Link>
    </div>
  )
}

export default CustomCard