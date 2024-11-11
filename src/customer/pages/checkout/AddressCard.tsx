import React, { useState } from 'react';
import { MapPin, Phone, Check } from 'lucide-react';

const AddressCard = () => {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <div
            className={`
        p-4 border-2 rounded-lg shadow-md transition-all duration-300 
        ${isSelected
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
            } 
        flex items-start space-x-4 cursor-pointer
      `}
            onClick={() => setIsSelected(!isSelected)}
        >
            <div className="pt-1">
                <div
                    className={`
            w-6 h-6 border-2 rounded-full flex items-center justify-center
            ${isSelected
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300'
                    }
          `}
                >
                    {isSelected && <Check className="text-white w-4 h-4" />}
                </div>
            </div>

            <div className="flex-grow space-y-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">Tuan Anh</h2>
                    {isSelected && (
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              Default
            </span>
                    )}
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

export default AddressCard;