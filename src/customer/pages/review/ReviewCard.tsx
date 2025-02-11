import React, { useState, useMemo } from 'react';
import { Avatar, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { red } from '@mui/material/colors';
import { Review } from '../../../types/ReviewType';

interface ReviewCardProps {
    reviews: Review[];
    onWriteReview?: () => void;
    onEditReview?: (review: Review) => void;
    onLikeReview?: (reviewId: number) => void;
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

const ReviewCard: React.FC<ReviewCardProps> = ({ 
    reviews, 
    onWriteReview, 
    onEditReview
}) => {
    const [activeTab, setActiveTab] = useState('all');

    const { averageRating, ratingDistribution, filteredReviews } = useMemo(() => {
        const avgRating = reviews.length > 0 
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
            : 0;

        const distribution = [5, 4, 3, 2, 1].map(star => 
            reviews.length > 0
                ? reviews.filter(review => review.rating === star).length / reviews.length * 100
                : 0
        );

        const filtered = activeTab === 'all' 
            ? reviews 
            : reviews.filter(review => 
                review.rating === parseInt(activeTab.replace('star', ''))
            );

        return { 
            averageRating: avgRating, 
            ratingDistribution: distribution, 
            filteredReviews: filtered 
        };
    }, [reviews, activeTab]);

    const starTabs = [
        { id: 'all', label: 'Tất cả' },
        { id: '5star', label: '5 Sao' },
        { id: '4star', label: '4 Sao' },
        { id: '3star', label: '3 Sao' },
        { id: '2star', label: '2 Sao' },
        { id: '1star', label: '1 Sao' },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Đánh giá sản phẩm</h2>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
                            <span className="text-gray-500">/5</span>
                        </div>
                        <Rating value={averageRating} readOnly precision={0.5} />
                        <span className="text-gray-500">({reviews.length} đánh giá)</span>
                    </div>
                </div>

                {/* Rating Statistics */}
                <div className="flex gap-4">
                    {[5, 4, 3, 2, 1].map((star, index) => (
                        <div key={star} className="flex items-center gap-2">
                            <span>{star}</span>
                            <StarIcon sx={{ color: red[500], fontSize: 16 }} />
                            <div className="w-32 h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-full bg-red-500 rounded-full"
                                    style={{ width: `${ratingDistribution[index].toFixed(0)}%` }}
                                />
                            </div>
                            <span className="text-sm text-gray-500">
                                {ratingDistribution[index].toFixed(0)}%
                            </span>
                        </div>
                    ))}
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-4 border-b">
                    {starTabs.map((tab) => (
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

                {/* Write Review Button */}
                <div className="flex justify-center mb-4">
                    <button 
                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        onClick={onWriteReview}
                    >
                        Viết đánh giá
                    </button>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {filteredReviews.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-gray-500 mb-4">Chưa có đánh giá nào</div>
                        </div>
                    ) : (
                        filteredReviews.map((review) => (
                            <div key={review.id} className="border-b pb-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <Avatar>
                                        {review.user.fullName[0]}
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold">
                                            {review.user.fullName}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <Rating value={review.rating} readOnly size="small" />
                                            <span className="text-gray-500 text-sm">
                                                {formatDate(review.createdDate)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-end flex-grow">
                                    <button 
                                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        onClick={() => onEditReview?.(review)}
                                    >
                                        Chỉnh sửa đánh giá
                                    </button>
                                </div>
                                </div>

                                <p className="text-gray-700 mb-4">{review.reviewText}</p>                                
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;