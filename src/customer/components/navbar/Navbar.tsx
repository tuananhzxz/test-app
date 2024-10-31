import React, { useState } from 'react'
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Avatar, Box, Button, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Storefront } from '@mui/icons-material';
import CategorySheet from './CategorySheet';
import { mainCategory } from '../../../data/category/mainCategory';

const Navbar = () => {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
    const [selectedCategory, setSelectedCategory] = useState('Sanpham1');
    const [showSheet, setShowSheet] = useState(false);

  return (
    <div>
        <Box className='sticky top-0 left-0 right-0 bg-white' sx={{zIndex: 2}}>
            <div className='flex items-center justify-between px-5 lg:px-20 h-[70px] border-b'>
                <div className='flex items-center gap-2'>
                    { !isLarge && <IconButton>
                        <ListIcon />
                    </IconButton>}
                    <h1 className="logo cursor-pointer text-lg md:text-2xl">ShopTanh</h1>
                </div>
                <ul className='flex items-center font-medium text-gray-800 gap-6'>
                    {mainCategory.map((item) => 
                    <li onMouseLeave={() => setShowSheet(false)} 
                        onMouseEnter={() => {
                        setShowSheet(true);
                        setSelectedCategory(item.categoryId);
                        }}
                     className='mainCategory hover:text-primary-color hover:border-b-2 h-[70px] px-4 flex items-center hover:border-primary-color cursor-pointer'>{item.name}</li>)}
                </ul>

                <div className='flex items-center gap-1 lg:gap-6'>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <FavoriteBorderOutlinedIcon sx={{fontSize: 32}} />
                    </IconButton>
                    <IconButton>
                        <ShoppingCartOutlinedIcon className='text-gray-700' sx={{fontSize: 32}} />
                    </IconButton>
                    
                   {isLarge && <Button startIcon={<Storefront />} variant='outlined'>
                        Đăng ký ngay
                    </Button>}
                    {
                        false ? <Button><Avatar sx={{width: 32, height: 32}} src=''></Avatar>
                                <h1 className='font-semibold ml-2 hidden lg:block'>Tanhzxz</h1>
                        </Button> : <Button variant='contained'>Đăng nhập</Button>
                    }
                </div>
            </div>
            {showSheet && <div onMouseLeave={() => setShowSheet(false)} onMouseEnter={() => setShowSheet(true)}
             className='categorySheet absolute top-[4.41rem] left-20 right-20 border bg-slate-500'>
            <CategorySheet selectedCategory={selectedCategory} />
            </div>}
        </Box>
    </div>
  )
}

export default Navbar