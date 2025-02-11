import React from 'react';
import { MapPin, Phone, Check } from 'lucide-react';
import { Address } from '../../../types/UserType';

interface AddressCardProps {
    address: Address;
    isSelected: boolean;
    onSelect: (address: Address) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, isSelected, onSelect }) => {
    return (
        <div
            className={`
                p-4 border-2 rounded-lg shadow-md transition-all duration-300
                ${isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'}
                flex items-start space-x-4 cursor-pointer
            `}
            onClick={() => onSelect(address)}
        >
            <div className="pt-1">
                <div className={`
                    w-6 h-6 border-2 rounded-full flex items-center justify-center
                    ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}
                `}>
                    {isSelected && <Check className="text-white w-4 h-4" />}
                </div>
            </div>
            
            <div className="flex-grow space-y-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">{address.name}</h2>
                    {isSelected && (
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            Default
                        </span>
                    )}
                </div>
                
                <div className="flex items-center text-gray-600 space-x-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <p className="text-sm">{`${address.address}, ${address.city}, ${address.state} - ${address.code}`}</p>
                </div>
                
                <div className="flex items-center text-gray-600 space-x-2">
                    <Phone className="w-5 h-5 text-green-500" />
                    <p className="text-sm">{address.phone}</p>
                </div>
            </div>
        </div>
    );
};

export default AddressCard;