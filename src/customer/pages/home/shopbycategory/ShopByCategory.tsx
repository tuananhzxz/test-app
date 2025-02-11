import React from 'react'
import ShopByCategoryCard from './ShopByCategoryCard'
import { HomeCategoryType } from '../../../../types/HomeCategoryType'

const ShopByCategory = ({item} : {item : HomeCategoryType[]}) => {
  return (
    <div className="py-8 px-4 lg:px-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Danh mục sản phẩm</h2>
        <p className="mt-2 text-gray-600">Khám phá các sản phẩm theo danh mục</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {item.slice(14, 26).map((category) => (
          category.section.toString() === "SHOP_BY_CATEGORY" &&
          (
            <ShopByCategoryCard 
              key={category.id}
              category={category}
            />
          )))
          }
        </div>
    </div>
  )
}

export default ShopByCategory