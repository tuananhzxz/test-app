import React from 'react'

const CategoryGrid = () => {
  return (
    <div className='grid gap-4 grid-cols-12 grid-rows-12 lg:h-[600px] px-5 lg:px-20'>

        <div className='col-span-3 row-span-12 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md' src="https://taimienphi.vn/tmp/cf/aut/hinh-anh-cute-dep-de-thuong-nhat-1.jpg" alt="123" />
        </div>

        <div className='col-span-3 row-span-6 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md' src="https://taimienphi.vn/tmp/cf/aut/hinh-anh-cute-dep-de-thuong-nhat-1.jpg" alt="12223" />
        </div>

        <div className='col-span-2 row-span-6 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md' src="https://i.imgur.com/LdisWqLh.jpg" alt="123" />
        </div>

        <div className='col-span-4 row-span-12 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md' src="https://taimienphi.vn/tmp/cf/aut/hinh-anh-cute-dep-de-thuong-nhat-1.jpg" alt="123" />
        </div>

        <div className='col-span-3 row-span-6 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md' src="https://i.imgur.com/LdisWqLh.jpg" alt="123" />
        </div>

        <div className='col-span-2 row-span-6 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md' src="https://i.imgur.com/LdisWqLh.jpg" alt="123" />
        </div>
        
    </div>
  )
}

export default CategoryGrid