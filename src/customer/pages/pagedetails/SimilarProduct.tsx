import React from 'react';
import SimilarProductCard from "./SimilarProductCard";

const SimilarProduct = () => {
    return (
        <div className={`grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-between gap-4 gap-y-8`}>
            {[...Array(7)].map((_, index) => <SimilarProductCard key={index}/>)}
        </div>
    );
}

export default SimilarProduct;