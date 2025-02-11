import React, { useState, useEffect } from 'react';
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
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../state/Store';
import { getOrderById, getOrderItemById, cancelOrder } from '../../../state/customer/OrderSlice';

const OrderDetails = () => {
    const dispatch = useAppDispatch();
    const { orderId, orderItemId } = useParams();
    const order = useAppSelector((state) => state.order.currentOrder);
    const loading = useAppSelector((state) => state.order.loading);
    const [openCancelDialog, setOpenCancelDialog] = useState(false);
    const [orderItems, setOrderItems] = useState<number[]>([]);

    useEffect(() => {
        if (orderId) {
            dispatch(getOrderById(Number(orderId)));
        }
        if (orderItemId) {
            const itemIds = orderItemId.split(',').map(id => parseInt(id));
            setOrderItems(itemIds);
            itemIds.forEach(id => {
                dispatch(getOrderItemById(id));
            });
        }
    }, [dispatch, orderId, orderItemId]);

    const getOrderStatuses = () => {
        if (!order) return [];

        const statuses = [
            {
                icon: <StorefrontOutlined />,
                label: "Đặt hàng",
                date: new Date(order.orderDate).toLocaleString('vi-VN'),
                completed: true
            },
            {
                icon: <PendingOutlined />,
                label: "Chuẩn bị hàng",
                completed: ['CONFIRMED', 'SHIPPED', 'DELIVERED'].includes(order.orderStatus)
            },
            {
                icon: <LocalShipping />,
                label: "Đang giao",
                completed: ['SHIPPED', 'DELIVERED'].includes(order.orderStatus),
                active: order.orderStatus === 'SHIPPED'
            },
            {
                icon: <CheckCircleOutline />,
                label: "Giao hàng thành công",
                completed: order.orderStatus === 'DELIVERED'
            }
        ];

        if (order.orderStatus === 'CANCELLED') {
            return [{
                icon: <CancelOutlined />,
                label: "Đã hủy",
                completed: true
            }];
        }

        return statuses;
    };

    const canCancelOrder = () => {
        if (!order) return false;
        return ['PENDING', 'PLACED'].includes(order.orderStatus);
    };

    const handleCancelOrder = async () => {
        if (!orderId) return;
        await dispatch(cancelOrder(Number(orderId)));
        setOpenCancelDialog(false);
        dispatch(getOrderById(Number(orderId)));
    };

    if (loading || !order) {
        return <div>Đang tải...</div>;
    }

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border-l-4 border-blue-500">
            {/* Order Header */}
            <div className="bg-blue-50 p-4 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-blue-800">
                        Đơn hàng #{order.id.toString().padStart(6, '0')}
                    </h2>
                    <p className="text-sm text-gray-600">
                        Ngày đặt: {new Date(order.orderDate).toLocaleDateString('vi-VN')}
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
                        label={order.orderStatus === 'PENDING' ? 'Chờ xác nhận' :
                               order.orderStatus === 'PLACED' ? 'Đã đặt hàng' :
                               order.orderStatus === 'CONFIRMED' ? 'Đã xác nhận' :
                               order.orderStatus === 'SHIPPED' ? 'Đang giao hàng' :
                               order.orderStatus === 'DELIVERED' ? 'Đã giao hàng' : 'Đã hủy'}
                        color={order.orderStatus === 'CANCELLED' ? "error" : "primary"}
                        variant="outlined"
                    />
                </div>
            </div>

            {/* Delivery Status Tracker */}
            <div className="p-6">
                <Stepper alternativeLabel>
                    {getOrderStatuses().map((status, index) => (
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
            {order.orderItems.map((item) => (
                <div key={item.id} className="p-6 bg-gray-50 border-t flex space-x-6">
                    <div className="w-1/3">
                        <img
                            src={item.product.images[0] || "https://via.placeholder.com/300"}
                            alt={item.product.title}
                            className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                    </div>

                    <div className="w-2/3 space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    {item.product.title}
                                </h3>
                                <p className="text-sm text-gray-600">Mã sản phẩm: {item.product.id}</p>
                            </div>
                            <span className="text-lg font-semibold text-blue-600">
                                {item.sellingPrice?.toLocaleString('vi-VN')} VNĐ
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="font-medium text-gray-600">Số lượng</p>
                                <p>{item.quantity}</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-600">Phí vận chuyển</p>
                                <p className="text-green-600">Miễn phí</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <p className="text-sm text-gray-500">
                                <strong>Ghi chú:</strong> {'Không có ghi chú'}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Order Summary */}
            <div className="p-6 bg-white border-t flex justify-between">
                <div>
                    <p className="text-sm text-gray-600">Tổng tiền hàng</p>
                    <p className="font-semibold">{order.totalSellingPrice?.toLocaleString('vi-VN')} VNĐ</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Phí vận chuyển</p>
                    <p className="text-green-600 font-semibold">Miễn phí</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Tổng thanh toán</p>
                    <p className="font-bold text-blue-700 text-lg">{order.totalSellingPrice?.toLocaleString('vi-VN')} VNĐ</p>
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

export default OrderDetails;