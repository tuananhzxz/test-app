import React, { useState } from 'react'
import ProductCard from './ProductCard'
import FilterSection from './FilterSection'
import { Box, Divider, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, useTheme } from '@mui/material'
import { FilterAlt } from '@mui/icons-material'
import { useSearchParams } from 'react-router-dom'
import {sortOptions} from "../../../data/filter/sort";

const Product = () => {
    const theme = useTheme();
    const isLargeScreen = theme.breakpoints.up('lg');
    const [sort, setSort] = useState();
    const [page, setPage] = useState(1);
    const [searchParam, setSearchParam] = useSearchParams()

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        searchParam.set('page', value.toString());
        setSearchParam(searchParam);
      }

    const handleSortChange = (event:any) => {
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

                    <FormControl 
                        size='small' 
                        sx={{
                            width: "240px",
                            '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: '#3f51b5',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#3f51b5',
                            }
                            }
                        }}
                        >
                        <InputLabel 
                            shrink 
                            htmlFor="sort-select"
                            sx={{
                            color: '#3f51b5',
                            '&.Mui-focused': {
                                color: '#3f51b5',
                            }
                            }}
                        >
                            Sắp xếp theo
                        </InputLabel>
                        <Select
                            id="sort-select"
                            value={sort}
                            label="Sắp xếp theo"
                            onChange={handleSortChange}
                            MenuProps={{
                            PaperProps: {
                                sx: {
                                maxHeight: 300,
                                '& .MuiMenuItem-root': {
                                    padding: '12px 16px',
                                    '&:hover': {
                                    backgroundColor: 'rgba(63, 81, 181, 0.08)',
                                    },
                                    '&.Mui-selected': {
                                    backgroundColor: 'rgba(63, 81, 181, 0.16)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(63, 81, 181, 0.24)',
                                    }
                                    }
                                }
                                }
                            }
                            }}
                        >
                            {sortOptions.map((option) => (
                            <MenuItem 
                                key={option.value} 
                                value={option.value}
                                sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    transform: 'translateX(4px)'
                                }
                                }}
                            >
                                <span style={{ fontSize: '1.2rem' }}>{option.icon}</span>
                                <span>{option.label}</span>
                            </MenuItem>
                            ))}
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

                <div className='flex justify-center items-center py-10'>
                <Pagination
                count={12}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                size="large"
                showFirstButton
                showLastButton
                className='flex justify-center'
                sx={{
                    '& .MuiPaginationItem-root': {
                    margin: '0 4px',
                    fontWeight: 600,
                    color: '#3f51b5',
                    '&.Mui-selected': {
                        backgroundColor: '#3f51b5',
                        color: 'white',
                        '&:hover': {
                        backgroundColor: '#303f9f'
                        }
                    }
                    }
                }}
                />
            </div>
            </div>
        </div>
    </div>
  )
}

export default Product