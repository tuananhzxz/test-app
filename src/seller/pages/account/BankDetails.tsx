import React, { useState } from 'react';
import { Wallet, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BankDetails = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        accountNumber: '1234567890',
        accountHolder: 'Tuan Anh',
        bankName: 'Vietcombank',
        branchName: 'Hà Nội',
        code: '100000'
    });

    const handleSubmit = (e:any) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Bank details updated:', formData);
        navigate('/seller/account');
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                        <Wallet className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Thông tin ngân hàng</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tên ngân hàng
                            </label>
                            <input
                                type="text"
                                value={formData.bankName}
                                onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Chi nhánh
                            </label>
                            <input
                                type="text"
                                value={formData.branchName}
                                onChange={(e) => setFormData({...formData, branchName: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Số tài khoản
                            </label>
                            <input
                                type="text"
                                value={formData.accountNumber}
                                onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Chủ tài khoản
                            </label>
                            <input
                                type="text"
                                value={formData.accountHolder}
                                onChange={(e) => setFormData({...formData, accountHolder: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mã số ngân hàng
                            </label>
                            <input
                                type="text"
                                value={formData.code}
                                onChange={(e) => setFormData({...formData, code: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BankDetails;