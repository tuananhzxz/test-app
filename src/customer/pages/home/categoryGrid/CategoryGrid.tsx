import React from 'react';
import { Box, Typography } from '@mui/material';

interface imageCard {
    src: string;
    title: string;
    description: string;
    span: string; 
  
}

const ImageCard = ({ src, title, description, span } : imageCard) => {
  return (
    <Box
      className={`relative group overflow-hidden rounded-lg ${span}`}
      sx={{
        height: '100%',
        '&:hover img': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <img
        className="w-full h-full object-cover object-center transition-transform duration-700"
        src={src}
        alt={title}
        loading="lazy"
      />
      
      {/* Overlay Gradient */}
      <Box
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      
      {/* Content */}
      <Box
        className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
      >
        <Typography
          variant="h6"
          className="text-white font-bold mb-1"
          sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          className="text-gray-200"
          sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

const CategoryGrid = () => {
  const categories = [
    {
      src: "https://taimienphi.vn/tmp/cf/aut/hinh-anh-cute-dep-de-thuong-nhat-1.jpg",
      title: "Thời trang",
      description: "Khám phá xu hướng mới nhất",
      span: "col-span-3 row-span-12"
    },
    {
      src: "https://taimienphi.vn/tmp/cf/aut/hinh-anh-cute-dep-de-thuong-nhat-1.jpg",
      title: "Phụ kiện",
      description: "Hoàn thiện phong cách của bạn",
      span: "col-span-3 row-span-6"
    },
    {
      src: "https://i.imgur.com/LdisWqLh.jpg",
      title: "Giày dép",
      description: "Bước đi tự tin",
      span: "col-span-2 row-span-6"
    },
    {
      src: "https://taimienphi.vn/tmp/cf/aut/hinh-anh-cute-dep-de-thuong-nhat-1.jpg",
      title: "Đồ điện tử",
      description: "Công nghệ hiện đại",
      span: "col-span-4 row-span-12"
    },
    {
      src: "https://i.imgur.com/LdisWqLh.jpg",
      title: "Mỹ phẩm",
      description: "Tỏa sáng mỗi ngày",
      span: "col-span-3 row-span-6"
    },
    {
      src: "https://i.imgur.com/LdisWqLh.jpg",
      title: "Đồ gia dụng",
      description: "Tiện ích cho gia đình",
      span: "col-span-2 row-span-6"
    }
  ];

  return (
    <Box className="container mx-auto px-4 py-8">

      <Box
        className="grid gap-4 grid-cols-12 grid-rows-12"
        sx={{
          height: {
            xs: 'auto',
            lg: '600px'
          },
          '& > div': {
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }
          }
        }}
      >
        {categories.map((category, index) => (
          <ImageCard
            key={index}
            src={category.src}
            title={category.title}
            description={category.description}
            span={category.span}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CategoryGrid;