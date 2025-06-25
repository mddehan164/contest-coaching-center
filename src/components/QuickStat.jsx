import React from 'react'


const QuickStat = ({data}) => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-3'>
        <div className={`rounded-full bg-headerColor w-1/2 aspect-square flex items-center justify-center text-headerColorHover text-4xl ${!data.value ? 'shadow-[0_0_3px_rgba(0,0,0,0.25)] hover:scale-105 hover:shadow-[0_0_12px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out': 'text-white bg-headerColorHover'}`}>
            <data.icon />
        </div>
        {data.value && <p className='text-center text-sm font-bold md:text-xl'>{data.value}</p>}
        <p className={`h-1/2 text-center text-md font-bold md:text-lg ${data.value && "xl:text-xl"}`}>{data.title}</p>
    </div>
  )
}

export default QuickStat


