import React, {useState} from "react";

const PricingCard = () => {
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const subtotal = 1000000;
    const shipping = 30000;
    return (
        <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span>{subtotal.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span>{shipping.toLocaleString()}đ</span>
            </div>
            <div className={`flex justify-between`}>
                <span>Số tiền miễn giảm</span>
                <span>100.000đ</span>
            </div>
            {discount > 0 && (
                <div className="flex justify-between text-green-500">
                    <span>Giảm giá khi áp mã:</span>
                    <span>-{discount.toLocaleString()}đ</span>
                </div>
            )}
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Tổng cộng:</span>
                <span>{(subtotal + shipping - discount).toLocaleString()}đ</span>
            </div>
        </div>
    );
}

export default PricingCard;