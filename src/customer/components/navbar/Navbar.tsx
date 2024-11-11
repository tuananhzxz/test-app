import React, { useState } from 'react';
import { 
    Search, 
    Favorite, 
    ShoppingBag, 
    Store, 
    Menu,
    PersonOutline 
} from '@mui/icons-material';
import { Avatar, Box, Button, IconButton, useMediaQuery, useTheme, Tooltip } from '@mui/material';
import CategorySheet from './CategorySheet';
import { mainCategory } from '../../../data/category/mainCategory';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
    const [selectedCategory, setSelectedCategory] = useState('Sanpham1');
    const [showSheet, setShowSheet] = useState(false);
    const navigate = useNavigate();

    return (
        <Box className="sticky top-0 left-0 right-0 bg-white shadow-sm" sx={{ zIndex: 2 }}>
            <div className="max-w mx-auto">
                <div className="flex items-center justify-between px-4 h-16 lg:h-20">
                    <div className="flex items-center gap-4">
                        {!isLarge && (
                            <IconButton className="hover:rotate-90 transition-all duration-300">
                                <Menu />
                            </IconButton>
                        )}
                        <div 
                            onClick={() => navigate("/")} 
                            className="flex items-center space-x-2 cursor-pointer group"
                        >
                            <ShoppingBag 
                                className="text-primary-color group-hover:scale-110 transition-transform" 
                                sx={{ fontSize: 28 }}
                            />
                            <span className="text-xl lg:text-2xl font-bold tracking-tight group-hover:text-primary-color transition-colors">
                                ShopTanh
                            </span>
                        </div>
                    </div>

                    {/* Center Section */}
                    <div className="hidden lg:flex">
                        <ul className="flex items-center space-x-1">
                            {mainCategory.map((item) => (
                                <li
                                    key={item.categoryId}
                                    onMouseLeave={() => setShowSheet(false)}
                                    onMouseEnter={() => {
                                        setShowSheet(true);
                                        setSelectedCategory(item.categoryId);
                                    }}
                                    className="relative px-4 h-16 lg:h-20 flex items-center"
                                >
                                    <span className="cursor-pointer font-medium hover:text-primary-color transition-colors relative group">
                                        {item.name}
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-color transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-2 lg:space-x-4">
                        <Tooltip title="Tìm kiếm">
                            <IconButton className="hover:bg-gray-100 transition-colors">
                                <Search />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Yêu thích">
                            <IconButton className="hover:bg-gray-100 transition-colors">
                                <Favorite />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Giỏ hàng">
                            <IconButton 
                                onClick={() => navigate("/cart")}
                                className="hover:bg-gray-100 transition-colors"
                            >
                                <ShoppingBag />
                            </IconButton>
                        </Tooltip>

                        {isLarge && (
                            <Button
                                variant="outlined"
                                startIcon={<Store />}
                                onClick={() => navigate("/become/seller")}
                                className="hidden lg:flex"
                                sx={{
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    borderWidth: '2px',
                                    '&:hover': {
                                        borderWidth: '2px'
                                    }
                                }}
                            >
                                Đăng ký ngay
                            </Button>
                        )}

                        {true ? (
                            <Button
                                onClick={() => navigate("/account/order")}
                                className="min-w-0"
                                sx={{ 
                                    borderRadius: '8px',
                                    '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                                }}
                            >
                                <div className="flex items-center space-x-2">
                                    <Avatar
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            border: '2px solid',
                                            borderColor: 'primary.main'
                                        }}
                                    >
                                        <PersonOutline />
                                    </Avatar>
                                    {isLarge && (
                                        <span className="font-medium">Tanhzxz</span>
                                    )}
                                </div>
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: '8px',
                                    textTransform: 'none'
                                }}
                            >
                                Đăng nhập
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Category Sheet */}
            {showSheet && (
                <div
                    onMouseLeave={() => setShowSheet(false)}
                    onMouseEnter={() => setShowSheet(true)}
                    className="absolute w-full bg-white shadow-lg border-t"
                >
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <CategorySheet selectedCategory={selectedCategory} />
                    </div>
                </div>
            )}
        </Box>
    );
};

export default Navbar;