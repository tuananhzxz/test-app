import React, { useEffect } from 'react';
import DealCard from './DealCard';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch, useAppSelector } from '../../../../state/Store';
import { deleteDeal, getDeal } from '../../../../state/admin/DealAdmin';

const Deal = () => {

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getDeal());
    }, [dispatch]);

    const { dealAdmin } = useAppSelector((state) => state);
    const deals = dealAdmin.deals;
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
    };

    const getTodayStartTimestamp = () => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    };

    const todayStartTimestamp = getTodayStartTimestamp();


    const onDeleteDeal = (id: number) => {
        try {
            // deleteDeal(id);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='py-5 lg:px-20'>
            <div className='w-full'>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Deal mới nhất</h2>
                <p className="mt-2 text-gray-600">Khám phá các deal hôm nay!</p>
            </div>
                    <Slider {...settings}>
                        {deals.map((deal) => (
                            <div key={deal.id}>
                                <DealCard  imageUrl={deal.category.image} name={deal.category.name} discount={deal.discount} onDeleteDeal={onDeleteDeal} dealId={deal.category.id} createdAt={todayStartTimestamp}/>
                            </div>
                        ))}
                    </Slider>
            </div>
        </div>
    );
};

export default Deal;