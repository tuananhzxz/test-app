import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Avatar, Rating } from '@mui/material';
import { red } from '@mui/material/colors';

const ReviewCard = () => {
    const [activeTab, setActiveTab] = useState('all');

    const reviews = [
        {
            id: 1,
            user: "Người dùng 1",
            rating: 5,
            date: "20/10/2024",
            comment: "Sản phẩm rất đáng yêu và chất lượng tốt!",
            helpful: 12,
            notHelpful: 2,
            images: [
                "https://img.freepik.com/premium-photo/beautiful-nursery-theme-art-cute-fox-pastel-colors_1110958-12363.jpg?semt=ais_hybrid",
            ]
        },
        {
            id: 2,
            user: "Người dùng 2",
            rating: 4,
            date: "19/10/2024",
            comment: "Tôi rất hài lòng với sản phẩm này. Màu sắc đẹp, chất liệu tốt.",
            helpful: 8,
            notHelpful: 1,
            images: []
        },
        {
            id: 3,
            user: "Người dùng 3",
            rating: 4,
            date: "19/10/2024",
            comment: "Tôi rất hài lòng với sản phẩm này. Màu sắc đẹp, chất liệu tốt.",
            helpful: 8,
            notHelpful: 1,
            images: []
        }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Đánh giá sản phẩm</h2>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            <span className="text-3xl font-bold">4.5</span>
                            <span className="text-gray-500">/5</span>
                        </div>
                        <Rating value={4.5} readOnly precision={0.5} />
                        <span className="text-gray-500">(234 đánh giá)</span>
                    </div>
                </div>

                {/* Rating Statistics */}
                <div className="flex gap-4">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-2">
                            <span>{star}</span>
                            <StarIcon sx={{ color: red[500], fontSize: 16 }} />
                            <div className="w-32 h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-full bg-red-500 rounded-full"
                                    style={{ width: `${star * 20}%` }}
                                />
                            </div>
                            <span className="text-sm text-gray-500">{star * 20}%</span>
                        </div>
                    ))}
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-4 border-b">
                    {[
                        { id: 'all', label: 'Tất cả' },
                        { id: '5star', label: '5 Sao' },
                        { id: '4star', label: '4 Sao' },
                        { id: '3star', label: '3 Sao' },
                        { id: '2star', label: '2 Sao' },
                        { id: '1star', label: '1 Sao' },
                        { id: 'withPhotos', label: 'Có hình ảnh' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            className={`pb-2 px-4 ${
                                activeTab === tab.id
                                    ? 'border-b-2 border-red-500 text-red-500 font-semibold'
                                    : 'text-gray-500'
                            }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6">
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar>{review.user[0]}</Avatar>
                                <div>
                                    <h3 className="font-semibold">{review.user}</h3>
                                    <div className="flex items-center gap-2">
                                        <Rating value={review.rating} readOnly size="small" />
                                        <span className="text-gray-500 text-sm">
                                            {review.date}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-4">{review.comment}</p>

                            {review.images.length > 0 && (
                                <div className="flex gap-2 mb-4">
                                    {review.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Review ${index + 1}`}
                                            className="w-20 h-20 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center gap-6">
                                <button className="flex items-center gap-1 text-gray-500 hover:text-red-500">
                                    <ThumbUpIcon fontSize="small" />
                                    <span>{review.helpful}</span>
                                </button>
                                <button className="flex items-center gap-1 text-gray-500 hover:text-red-500">
                                    <ThumbDownIcon fontSize="small" />
                                    <span>{review.notHelpful}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Review Button */}
                <div className="flex justify-center">
                    <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        Viết đánh giá
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;