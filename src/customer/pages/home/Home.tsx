import React from 'react'
import OneCategory from './categoryOne/OneCategory'
import CategoryGrid from './categoryGrid/CategoryGrid'
import Deal from './deal/Deal'
import ShopByCategory from './shopbycategory/ShopByCategory'
import { Button } from '@mui/material'
import { Storefront } from '@mui/icons-material'

const Home = () => {
  return (
    <>
    <div className='space-y-5 lg:space-y-10 relative pb-20'>
      <div className='py-4'><OneCategory /></div>
      <div className='py-15'><CategoryGrid /></div>
      <div className='py-20'><Deal /></div>
      <div className='py-10'><ShopByCategory/></div>
      <section className='lg:px-20 relative lg:h-[450px] h-[200px] object-cover '>
        <img className='w-full h-full object-cover' src="https://mona.solutions/template/images/project-banner.jpg" alt="123" />
        <div className='absolute top-1/2 left-4 lg:left-[15rem] transform -translate-y-1/2 font-semibold lg:text-4xl space-y-3'>
          <h1 className='font-h1 w-[30rem] leading-[4rem] text-5xl py-4'>Đăng ký để trở thành người bán hàng</h1>
          <div className='flex items-center space-x-3 pb-10 px-10'>
            <p className='font-second text-lg md:text-3xl'>Đồng hành với</p>
            <p className='logo'>ShopTanh</p>
          </div>
          <div className='flex items-center justify-center'>
          <Button size='large' startIcon={<Storefront />} variant='contained'>Đăng ký ngay </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default Home