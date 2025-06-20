import React from 'react'

const MainBtn = ({data, btnStyle, isActive, onClick}) => {
  return (
    <button onClick={onClick} className={`max-sm:py-1 max-sm:px-2 max-sm:rounded-sm max-sm:text-sm sm:py-2 sm:px-4 bg-${isActive ? 'white' : btnStyle.btnBgColor} px-6 py-4 ${isActive ? 'text-black border-2' : 'text-white'} rounded-lg hover:bg-${isActive ? '' : btnStyle.btnHoverColor } ${btnStyle.bgFull ? 'w-full': ''}`}>{data}</button>
  )
}

export default MainBtn