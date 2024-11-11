import React, { useState } from 'react';
import {
    LocalShipping,
    CheckCircleOutline,
    PendingOutlined,
    LocalOfferOutlined,
    StorefrontOutlined,
    CancelOutlined
} from "@mui/icons-material";
import {
    Stepper,
    Step,
    StepLabel,
    Chip,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";

const OrderItem = () => {
    // State for cancel order dialog.tsx
    const [openCancelDialog, setOpenCancelDialog] = useState(false);
    const [orderStatuses, setOrderStatuses] = useState([
        {
            icon: <StorefrontOutlined />,
            label: "Đặt hàng",
            date: "30/10/2024 - 10:30 AM",
            completed: true
        },
        {
            icon: <PendingOutlined />,
            label: "Chuẩn bị hàng",
            date: "31/10/2024 - 14:45 PM",
            completed: true
        },
        {
            icon: <LocalShipping />,
            label: "Đang giao",
            date: "01/11/2024 - 09:15 AM",
            completed: false,
            active: true
        },
        {
            icon: <CheckCircleOutline />,
            label: "Giao hàng thành công",
            date: "",
            completed: false
        }
    ]);

    // Check if order can be cancelled (within 7 days of order date)
    const canCancelOrder = () => {
        return true; // Simplified for example
    };

    // Handle cancel order
    const handleCancelOrder = () => {
        // Update order statuses to reflect cancellation
        const updatedStatuses = orderStatuses.map(status => {
            if (status.label === "Đang giao") {
                return {
                    ...status,
                    icon: <CancelOutlined />,
                    label: "Đã hủy",
                    completed: true,
                    active: false
                };
            }
            return status;
        });

        setOrderStatuses(updatedStatuses);
        setOpenCancelDialog(false);
        // Additional API call to cancel order can be placed here
    };

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border-l-4 border-blue-500">
            {/* Order Header */}
            <div className="bg-blue-50 p-4 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-blue-800">
                        Đơn hàng #ĐH2024110001
                    </h2>
                    <p className="text-sm text-gray-600">
                        Ngày đặt: 30/10/2024
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    {canCancelOrder() && (
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<CancelOutlined />}
                            onClick={() => setOpenCancelDialog(true)}
                            size="small"
                        >
                            Hủy đơn
                        </Button>
                    )}
                    <Chip
                        icon={<LocalOfferOutlined />}
                        label={orderStatuses.find(status => status.active)?.label || "Đã hủy"}
                        color={orderStatuses.find(status => status.active)?.label === "Đã hủy" ? "error" : "primary"}
                        variant="outlined"
                    />
                </div>
            </div>

            {/* Delivery Status Tracker */}
            <div className="p-6">
                <Stepper alternativeLabel>
                    {orderStatuses.map((status, index) => (
                        <Step
                            key={status.label}
                            active={status.active}
                            completed={status.completed}
                        >
                            <StepLabel
                                icon={status.icon}
                                StepIconProps={{
                                    sx: {
                                        color: status.label === "Đã hủy" ? 'red' :
                                            status.completed ? 'green' :
                                                status.active ? 'blue' : 'gray',
                                        fontSize: 30
                                    }
                                }}
                            >
                                <div className="text-center">
                                    <p className={`
                    font-semibold 
                    ${status.label === "Đã hủy" ? 'text-red-600' :
                                        status.completed ? 'text-green-600' :
                                            status.active ? 'text-blue-600' : 'text-gray-400'}
                  `}>
                                        {status.label}
                                    </p>
                                    {status.date && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            {status.date}
                                        </p>
                                    )}
                                </div>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>

            {/* Product Details */}
            <div className="p-6 bg-gray-50 border-t flex space-x-6">
                <div className="w-1/3">
                    <img
                        src="https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288883.jpg?semt=ais_hybrid"
                        alt="Product"
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                </div>

                <div className="w-2/3 space-y-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">
                                Áo Thun Nam Cao Cấp
                            </h3>
                            <p className="text-sm text-gray-600">Mã sản phẩm: SP2024110001</p>
                        </div>
                        <span className="text-lg font-semibold text-blue-600">
                            199,000 VNĐ
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <p className="font-medium text-gray-600">Màu sắc</p>
                            <p>Xanh Navy</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600">Kích thước</p>
                            <p>L</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600">Số lượng</p>
                            <p>1</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-600">Phí vận chuyển</p>
                            <p className="text-green-600">Miễn phí</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t">
                        <p className="text-sm text-gray-500">
                            <strong>Ghi chú:</strong> Kiểm tra hàng trước khi thanh toán
                        </p>
                    </div>
                </div>
            </div>

            {/* Order Summary */}
            <div className="p-6 bg-white border-t flex justify-between">
                <div>
                    <p className="text-sm text-gray-600">Tổng tiền hàng</p>
                    <p className="font-semibold">199,000 VNĐ</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Phí vận chuyển</p>
                    <p className="text-green-600 font-semibold">Miễn phí</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Tổng thanh toán</p>
                    <p className="font-bold text-blue-700 text-lg">199,000 VNĐ</p>
                </div>
            </div>

            {/* Cancel Order Confirmation Dialog */}
            <Dialog
                open={openCancelDialog}
                onClose={() => setOpenCancelDialog(false)}
                aria-labelledby="cancel-order-dialog-title"
                aria-describedby="cancel-order-dialog-description"
            >
                <DialogTitle id="cancel-order-dialog-title">
                    {"Xác nhận hủy đơn hàng"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="cancel-order-dialog-description">
                        Bạn có chắc chắn muốn hủy đơn hàng này?
                        Sau khi hủy, đơn hàng sẽ không thể khôi phục.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCancelDialog(false)} color="primary">
                        Không
                    </Button>
                    <Button
                        onClick={handleCancelOrder}
                        color="error"
                        variant="contained"
                        startIcon={<CancelOutlined />}
                    >
                        Xác nhận hủy
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default OrderItem;