import React from 'react';
import { Box, Typography } from '@mui/material';
import { HomeCategoryType } from '../../../../types/HomeCategoryType';

interface ImageCardProps {
  src: string;
  title: string;
  span?: string;
}

const ImageCard = ({ src, title, span }: ImageCardProps) => {
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
      </Box>
    </Box>
  );
};

// Helper function to get span based on index
const getSpanClass = (index: number): string => {
  const spanClasses = [
    "col-span-3 row-span-12", 
    "col-span-3 row-span-6", 
    "col-span-2 row-span-6", 
    "col-span-4 row-span-12",
    "col-span-3 row-span-6", 
    "col-span-2 row-span-6" 
  ];
  return spanClasses[index] || "";
};

const CategoryGrid = ({ item }: { item: HomeCategoryType[] }) => {
  const categories = item
    .slice(8, 14)
    .filter(category => category.section.toString() === "GRID")
    .map((category, index) => ({
      src: category.image || "",
      title: category.name || "",
      span: getSpanClass(index)
    }));

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
            span={category.span}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CategoryGrid;