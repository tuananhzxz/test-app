import React from 'react'
import OneCategoryCard from './OneCategoryCard'

const OneCategory = () => {
  return (
    <div className='flex felx-wrap justify-between py-5 lg:px-20 border-b'>
        {[1,1,1,1,1].map((item) => <OneCategoryCard />)}
    </div>
  )
}

export default OneCategory