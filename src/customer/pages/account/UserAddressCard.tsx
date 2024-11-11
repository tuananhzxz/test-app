import React from 'react';
import { MapPin, Phone } from "lucide-react";

const UserAddressCard = () => {
    return (
        <div className="p-4 border-2 rounded-lg shadow-md transition-all duration-300 border-gray-200 hover:border-blue-300 flex items-start space-x-4 cursor-pointer">
            <div className="flex-grow space-y-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">Tuan Anh</h2>
                </div>

                <div className="flex items-center text-gray-600 space-x-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <p className="text-sm">Ha Noi, Ha Noi, Ha Noi - 12345</p>
                </div>

                <div className="flex items-center text-gray-600 space-x-2">
                    <Phone className="w-5 h-5 text-green-500" />
                    <p className="text-sm">1232321312</p>
                </div>
            </div>
        </div>
    );
}

export default UserAddressCard;