import React from 'react'
import { customiseData } from '../data/custimiseData'
import CustomCard from './CustomCard'

const Customise = () => {
    console.log(customiseData)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mx-auto'>
        {
            customiseData.map((card, idx) => <CustomCard key={idx} data={card}/>)
        }
    </div>
  )
}

export default Customise