// SimilarProduct.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../state/Store';
import SimilarProductCard from "./SimilarProductCard";
import { getSimilarProducts } from '../../../state/customer/SimilarProduct';

interface SimilarProductProps {
  categoryId?: number;
  currentProductId?: number;
}

const SimilarProduct: React.FC<SimilarProductProps> = ({ categoryId, currentProductId }) => {
  const dispatch = useAppDispatch();
  const { similarProducts, loading } = useAppSelector(state => state.productSimilar);

  useEffect(() => {
    if (categoryId) {
      dispatch(getSimilarProducts({ categoryId, currentProductId }));
    }
  }, [dispatch, categoryId, currentProductId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-between gap-4 gap-y-8`}>
      {similarProducts.slice(0, 10).map((product) => (
        <SimilarProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default SimilarProduct;