import { Button, Divider, FormControl, FormControlLabel, FormLabel, Pagination, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
import { colors } from '../../../data/filter/color';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { discount } from '../../../data/filter/discount';
import { price } from '../../../data/filter/price';
import { useSearchParams } from 'react-router-dom';

const FilterSection = () => {
  const [expendColor, setExpendColor] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams();

  const handleColorExpand = () => {
      setExpendColor(!expendColor);
  };

  const clearAllFilters = () => {
      const newSearchParams = new URLSearchParams();
      if (searchParam.has('sort')) {
          newSearchParams.set('sort', searchParam.get('sort')!);
      }
      if (searchParam.has('page')) {
          newSearchParams.set('page', '1');
      }
      setSearchParam(newSearchParams);
  };

  const updateFilterParams = (e: any) => {
      const { name, value } = e.target;
      const newSearchParams = new URLSearchParams(searchParam);
      if (value) {
          newSearchParams.set(name, value);
      } else {
          newSearchParams.delete(name);
      }
      newSearchParams.set('page', '1');
      setSearchParam(newSearchParams);
  };

  return (
    <div className='-z-50 space-y-5 bg-white'>
      <div className='flex items-center justify-between h-[40px] px-9 lg:border-r'>
        <p className="text-lg font-semibold">
          Sắp xếp theo:
        </p>
        <Button onClick={clearAllFilters} size='small' className='text-primary-color cursor-pointer font-semibold'>
          Xóa bộ lọc
        </Button>
      </div>
      <Divider/>
      <div className="px-6 py-4 bg-white rounded-lg shadow-md">
        <FormControl fullWidth>
          <FormLabel 
            className="text-lg font-bold text-primary-color mb-3"
            sx={{
              color: "#3f51b5",
              "&.Mui-focused": { color: "#3f51b5" }
            }}
          >
            Khoảng Giá
          </FormLabel>
          <RadioGroup 
            onChange={updateFilterParams}
            aria-labelledby="price"
            name="price"
            className="grid grid-cols-2 gap-3"
          >
            {price.map((price) => (
              <FormControlLabel 
                key={price.value}
                value={price.value}
                control={<Radio />}
                label={
                  <div className='flex items-center space-x-3 group'>
                    <p className="text-sm text-gray-700 group-hover:text-primary-color">
                      {price.name}
                    </p>
                  </div>
                }
                className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-md"
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>

      <Divider/>
      <div className="px-6 py-4 bg-white rounded-lg shadow-md">
      <FormControl fullWidth>
        <FormLabel 
          className="text-lg font-bold text-primary-color mb-3"
          sx={{
            color: "#3f51b5",
            "&.Mui-focused": { color: "#3f51b5" }
          }}
        >
          Màu sắc
        </FormLabel>
        <RadioGroup 
          aria-labelledby="color"
          onChange={updateFilterParams}
          name="color"
          className="grid grid-cols-3 gap-3"
        >
          {colors.slice(0, expendColor ? colors.length : 5).map((color, index) => (
            <FormControlLabel 
              key={color.name}
              value={color.name}
              control={<Radio />}
              label={
                <div className='flex items-center space-x-3 group'>
                  <span 
                    style={{backgroundColor: color.hex}} 
                    className={`
                      h-6 w-6 rounded-full border border-gray-300 
                      transition-all duration-300 
                      group-hover:scale-110 group-hover:shadow-md
                    `}
                  ></span>
                  <p className="text-sm text-gray-700 group-hover:text-primary-color">
                    {color.name}
                  </p>
                </div>
              }
              className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-md"
            />
          ))}
        </RadioGroup>
      </FormControl>
      
      {colors.length > 5 && (
        <button 
          onClick={handleColorExpand} 
          className='
            mt-3 w-full flex items-center justify-center 
            text-primary-color font-medium 
            hover:bg-gray-100 
            py-2 rounded-md 
            transition-colors duration-300
          '
        >
          {expendColor ? (
            <>
              <ChevronUp className="mr-2 h-5 w-5" />
              Ẩn bớt
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-5 w-5" />
              {`+${colors.length - 5} màu khác`}
            </>
          )}
        </button>
      )}
      </div>

      <Divider/>
      <div className="px-6 py-4 bg-white rounded-lg shadow-md">
        <FormControl fullWidth>
          <FormLabel 
            className="text-lg font-bold text-primary-color mb-3"
            sx={{
              color: "#3f51b5",
              "&.Mui-focused": { color: "#3f51b5" }
            }}
          >
            Mức Giảm Giá
          </FormLabel>
          <RadioGroup 
            onChange={updateFilterParams}
            aria-labelledby="discount"
            name="discount"
            className="grid grid-cols-2 gap-3"
          >
            {discount.map((discount) => (
              <FormControlLabel 
                key={discount.value}
                value={discount.value}
                control={<Radio />}
                label={
                  <div className='flex items-center space-x-3 group'>
                    <p className="text-sm text-gray-700 group-hover:text-primary-color">
                      {discount.name}
                    </p>
                  </div>
                }
                className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-md"
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    
    </div>
  )
}

export default FilterSection