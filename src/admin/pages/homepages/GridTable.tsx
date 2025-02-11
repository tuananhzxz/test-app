import React from 'react'
import HomeCategory from './HomeCategory'
import { HomeCategorySection } from '../../../types/HomeCategoryType';

const GridTable = () => {
  return (
    <HomeCategory section={HomeCategorySection.GRID} />
  );
};

export default GridTable