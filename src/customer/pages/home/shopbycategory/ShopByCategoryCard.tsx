import React from 'react'
import { HomeCategoryType } from '../../../../types/HomeCategoryType'

const ShopByCategoryCard = ({ category } : { category : HomeCategoryType}) => {
  return (
    <div className='w-80 flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group'>
      <div className="w-64 h-64 overflow-hidden rounded-lg">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800 group-hover:text-[#3f51b5]">
        {category.name}
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        10 sản phẩm
      </p>
    </div>
  )
}

export default ShopByCategoryCard