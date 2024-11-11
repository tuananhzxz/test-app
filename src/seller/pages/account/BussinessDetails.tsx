import React, { useState } from 'react';
import { Building2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BusinessDetails = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        businessName: 'TechViet Solutions',
        gstin: '24AALCT0424L1Z3',
        accountStatus: 'Đang hoạt động'
    });
    const handleSubmit = (e:any) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Business details updated:', formData);
        navigate('/seller/account');
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">

            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                        <Building2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Thông tin doanh nghiệp</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tên doanh nghiệp
                            </label>
                            <input
                                type="text"
                                value={formData.businessName}
                                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                GSTIN
                            </label>
                            <input
                                type="text"
                                value={formData.gstin}
                                onChange={(e) => setFormData({...formData, gstin: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Trạng thái
                            </label>
                            <select
                                value={formData.accountStatus}
                                onChange={(e) => setFormData({...formData, accountStatus: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            >
                                <option value="Đang hoạt động">Đang hoạt động</option>
                                <option value="Tạm ngưng">Tạm ngưng</option>
                                <option value="Đã đóng">Đã đóng</option>
                            </select>
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

export default BusinessDetails;