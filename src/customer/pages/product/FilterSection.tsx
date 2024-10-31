import { Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

const FilterSection = () => {
  return (
    <div className='-z-50 space-y-5 bg-white'>
      <div className='flex items-center justify-between h-[40px] px-9 lg:border-r'>
        <p className="text-lg font-semibold">
          Sắp xếp theo:
        </p>
        <Button size='small' className='text-primary-color cursor-pointer font-semibold'>
          Xóa bộ lọc
        </Button>
      </div>
      <Divider/>
      <section>
      <FormControl>
        <FormLabel
        sx={{
          fontSize: "16px",
          fontWeight: "bold",
          color: "#3f51b5",
        }} 
        className="text-2xl font-semibold" id="color">Màu sắc</FormLabel>
        <RadioGroup
          aria-labelledby="color"
          defaultValue=""
          name="color"
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
      </section>
    </div>
  )
}

export default FilterSection