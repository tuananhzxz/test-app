import React from "react";

interface PricingCardProps {
    totalMrpPrice: number;
    totalSellingPrice: number;
    discount: number;
    currentPrice: number;
}

const PricingCard: React.FC<PricingCardProps> = ({
    totalMrpPrice,
    totalSellingPrice,
    discount,
    currentPrice
}) => {
    const finalTotal = totalSellingPrice - (discount || 0);

    return (
        <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span>{totalMrpPrice.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span>0đ</span>
            </div>
            <div className="flex justify-between">
                <span>Tiết kiệm:</span>
                <span>{(totalMrpPrice - totalSellingPrice).toLocaleString()}đ</span>
            </div>
            {discount > 0 && (
                <div className="flex justify-between text-green-500">
                    <span>Giảm giá khi áp mã:</span>
                    <span>-{discount.toLocaleString()}đ</span>
                </div>
            )}
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Tổng cộng:</span>
                <span>{finalTotal.toLocaleString()}đ</span>
            </div>
        </div>
    );
};

export default PricingCard;