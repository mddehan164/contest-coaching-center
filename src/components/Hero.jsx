import React from 'react'
import MainBtn from "./MainBtn"

const Hero = ({data}) => {
  return (
    <div className='w-full h-36 sm:h-44 md:h-52 lg:h-60 2xl:h-64 flex items-center justify-between'>
      <div className=' w-1/2 h-full px-2'>
        <h1 className='text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold xl:px-2'>{data.data.title}</h1>
        <h2>{data.data.subtitle}</h2>
        <p className='text-sm h-[60%] 2xl:text-lg sm:h-[75%] md:h-[85%] lg:h-[90%] overflow-auto mt-1 p-2 text-gray-500'>{data.data.des}</p>
        {
            data.data.btn && data.data.btnData.btnName.map((name, idx) => (
                      <MainBtn
                        key={idx}
                        data={name}
                        btnStyle={data.btnData.btnStyle}
                      />))
        }
      </div>
      <div className='h-full w-1/2 p-5 flex items-center justify-center'>
        <img src={data.img} alt="" className='w-full h-auto sm:w-[60%] lg:w-[55%]'/>
      </div>
    </div>
  )
}

export default Hero
