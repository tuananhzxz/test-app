import React, { useState } from 'react'
import ProductCard from './ProductCard'
import FilterSection from './FilterSection'
import { Box, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, useTheme } from '@mui/material'
import { FilterAlt } from '@mui/icons-material'

const Product = () => {
    const theme = useTheme();
    const isLargeScreen = theme.breakpoints.up('lg');
    const [sort, setSort] = useState();

    const handSortChange = (event:any) => {
        setSort(event.target.value);    
    }
  return (
    <div className='-z-10 mt-10'>
        <div>
            <h1 className='text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2'>
                Tên Sản Phẩm
            </h1>
        </div>
        <div className='lg:flex'>
            <section className='filter_section hidden lg:block w-[20%]'>
                <FilterSection />
            </section>
            <div className='w-full lg:w-[80%] space-y-5'>
                <div className='flex justify-between items-center px-9 h-[]'>
                    <div className='relative w-[50%]'>
                        { !isLargeScreen && (<IconButton><FilterAlt/></IconButton>)}    
                        { !isLargeScreen && (<Box><FilterSection/></Box>)}  
                    </div>
                    <FormControl size='small' sx={{width:"200px"}}>
                    <InputLabel shrink htmlFor="demo-simple-select-label">Lọc theo</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sort}
                        label="Chọn"
                        onChange={handSortChange}
                    >
                        <MenuItem value={"price_low"}>Giá : Thấp - Cao</MenuItem>
                        <MenuItem value={"price_high"}>Giá : Cao - Thấp</MenuItem>
                    </Select>
                    </FormControl>
                </div> 
                <Divider/>
                <section className='products_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center'>
                    {
                        [...Array(10)].map((_, index) => (
                            <ProductCard key={index}/>
                        ))
                    }
                </section>
            </div>
        </div>
    </div>
  )
}

export default Product