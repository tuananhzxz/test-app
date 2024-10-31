import React from 'react';
import DealCard from './DealCard';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Deal = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
    };
    return (
        <div className='py-5 lg:px-20'>
            <div className='w-full'>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Deal mới nhất</h2>
                <p className="mt-2 text-gray-600">Khám phá các deal hôm nay!</p>
            </div>
                    <Slider {...settings}>
                        {Array.from({ length: 5 }, (_, index) => (
                            <div key={index} className="px-4">
                                <DealCard
                                    imageUrl="https://cdn.tgdd.vn/Products/Images/44/231244/grey-1-750x500.jpg"
                                    name="MacbookPro"
                                    discount={10}
                                    price={10000}
                                />
                            </div>
                        ))}
                    </Slider>
            </div>
        </div>
    );
};

export default Deal;