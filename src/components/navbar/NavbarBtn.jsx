import React from 'react'

const NavbarBtn = (props) => {
  return (
    <button className={`max-sm:py-2 max-sm:px-6 max-sm:rounded-none sm:py-2 sm:px-4 bg-${props.data.data.btnStyle.btnColor} px-6 py-4 text-white rounded-lg hover:bg-${props.data.data.btnStyle.btnHoverColor}`}>
      {
        props.data.data.btnName
      }
    </button>
  )
}

export default NavbarBtn
