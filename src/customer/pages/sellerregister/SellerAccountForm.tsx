import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Button,
    Stepper,
    Step,
    StepLabel,
    Box,
    Paper
} from '@mui/material';
import { useFormik } from 'formik';
import {
    CheckCircle as CheckCircleIcon,
    ArrowForward as ArrowForwardIcon,
    ArrowBack as ArrowBackIcon,
    Store as StoreIcon
} from '@mui/icons-material';
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from './BecomeSellerFormStep2';
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";

const steps = [
    {
        title: "Thông tin cơ bản",
        description: "Nhập số điện thoại và mã số thuế"
    },
    {
        title: "Địa chỉ lấy hàng",
        description: "Thông tin địa điểm lấy hàng của bạn"
    },
    {
        title: "Thông tin ngân hàng",
        description: "Thiết lập tài khoản nhận thanh toán"
    },
    {
        title: "Hoàn tất",
        description: "Xác nhận và tạo cửa hàng"
    }
];

const SellerAccountForm = () => {
    const [activeStep, setActiveStep] = useState(0);

    const formik = useFormik({
        initialValues: {
            phone: "",
            otp: "",
            taxCode: "",
            pickupAddress: {
                name: "",
                phone: "",
                code: "",
                address: "",
                locality: "",
                city: "",
                state: ""
            },
            bankDetails: {
                accountNumber: "",
                accountHolderName: "",
                code: ""
            },
            sellerName: "",
            email: "",
            businessDetails: {
                businessName: "",
                businessEmail: "",
                businessPhone: "",
                businessAddress: "",
                logo: "",
                banner: "",
            },
            password: ""
        },
        onSubmit: (values) => {
            console.log(values);
        }
    });

    const handleStep = (value : number) => {
        if ((activeStep < steps.length - 1 && value === 1) || (activeStep > 0 && value === -1)) {
            setActiveStep(activeStep + value);
        }
        if (activeStep === steps.length - 1 && value === 1) {
            handleCreateAccount();
        }
    };

    const handleCreateAccount = () => {
        console.log('Tạo tài khoản thành công');
    };

    return (
        <Box sx={{ minHeight: '100vh', py: 4, px: 2 }}>
            <Box sx={{ maxWidth: '800px', mx: 'auto' }}>

                <Paper elevation={3} sx={{ borderRadius: 2 }}>
                    <CardHeader
                        sx={{ pb: 0 }}
                        title={
                            <Stepper activeStep={activeStep} alternativeLabel>
                                {steps.map((step, index) => (
                                    <Step key={step.title}>
                                        <StepLabel
                                            StepIconComponent={index < activeStep ? () => <CheckCircleIcon /> : undefined}                                        >
                                            <Typography variant="subtitle2">{step.title}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {step.description}
                                            </Typography>
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        }
                    />

                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ minHeight: '500px' }}>
                            {activeStep === 0 ? <BecomeSellerFormStep1 formik={formik} /> :
                            activeStep === 1 ? <BecomeSellerFormStep2 formik={formik} /> :
                            activeStep === 2 ? <BecomeSellerFormStep3 formik={formik} /> : <BecomeSellerFormStep4 formik={formik}/>
                            }
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <Button
                                onClick={() => handleStep(-1)}
                                disabled={activeStep === 0}
                                startIcon={<ArrowBackIcon />}
                                variant="outlined"
                            >
                                Quay lại
                            </Button>

                            <Button
                                onClick={() => handleStep(1)}
                                endIcon={activeStep !== steps.length - 1 ? <ArrowForwardIcon /> : null}
                                variant="contained"
                            >
                                {activeStep === steps.length - 1 ? 'Hoàn tất đăng ký' : 'Tiếp theo'}
                            </Button>
                        </Box>
                    </CardContent>
                </Paper>
            </Box>
        </Box>
    );
};

export default SellerAccountForm;