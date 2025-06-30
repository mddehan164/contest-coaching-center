import React from 'react'
import DHeaderLogo from './DHeaderLogo'
import DHeaderLinks from './DHeaderLinks'

const DHeaderMain = () => {
  return (
    <div className='flex w-full items-center justify-between px-1 sm:px-5 md:px-8 lg:px-14 xl:px-20'>
      <DHeaderLogo/>
      <DHeaderLinks/>
    </div>
  )
}

export default DHeaderMain
