import React from 'react'
import ShopByCategoryCard from './ShopByCategoryCard'

const ShopByCategory = () => {
  return (
    <div className="py-8 px-4 lg:px-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Danh mục sản phẩm</h2>
        <p className="mt-2 text-gray-600">Khám phá các sản phẩm theo danh mục</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1,1,1,1,1,1,1,1].map(() => <ShopByCategoryCard />)}
        </div>
    </div>
  )
}

export default ShopByCategory