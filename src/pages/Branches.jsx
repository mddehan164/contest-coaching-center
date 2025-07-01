import React from 'react'
import Hero from '../components/Hero';
import { branchHeroData } from '../data/branchData';

const Branches = () => {
  return (
    <div className='px-1 sm:px-5 md:px-10 lg:px-20 xl:px-44'>
        <Hero data={branchHeroData}/>
    </div>
  )
}

export default Branches
