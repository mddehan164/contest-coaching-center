import React from 'react'
import MainBtn from "./MainBtn"

const Hero = ({data}) => {
  return (
    <div className='w-full h-auto flex items-center justify-between'>
      <div className='bg-red-500 w-1/2'>
        <h1>{data.data.title}</h1>
        <h2>{data.data.subtitle}</h2>
        <p>{data.data.des}</p>
        {
            data.data.btn && data.data.btnData.btnName.map((name, idx) => (
                      <MainBtn
                        key={idx}
                        data={name}
                        btnStyle={data.btnData.btnStyle}
                      />))
        }
      </div>
      <div className='bg-blue-500 w-1/2'>
        <img src={data.img} alt="" />
      </div>
    </div>
  )
}

export default Hero
