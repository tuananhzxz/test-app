import React from 'react'

const ShopByCategoryCard = () => {
  return (
    <div className='w-[20rem] flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group'>
      <div className="p-4 transition-colors duration-300">
        <img src='https://cdn.tgdd.vn/Products/Images/44/231244/grey-1-750x500.jpg' alt='123' className="object-cover w-full h-full object-top" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800 group-hover:text-[#3f51b5]">Macbook</h3>
      <p className="mt-1 text-sm text-gray-500">
        10 sản phẩm
      </p>
    </div>
  )
}

export default ShopByCategoryCard