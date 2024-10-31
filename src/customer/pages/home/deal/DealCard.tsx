import React from 'react';

interface DealCardProps {
    imageUrl: string;
    name: string;
    discount: number;
    price: number;
  }

  const DealCard: React.FC<DealCardProps> = ({ imageUrl, name, discount, price }) => {
    return (
      <div className="w-[18rem] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-white to-purple-50">
        <div className="relative w-full h-48 overflow-hidden group">
          <img 
            src={imageUrl || "/api/placeholder/400/320"} 
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-red-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
            -{discount}%
          </div>
        </div>
        
        <div className="p-5 space-y-3">
          <p className="text-xl font-bold bg-gradient-to-r from-black to-pink-600 bg-clip-text text-transparent">
            {name}
          </p>
          
          <p className="text-lg font-semibold">
            <span className="text-gray-400 line-through mr-2">
              {Math.round(price * 100 / (100 - discount)).toLocaleString()}đ
            </span>
            <span className="text-red-500 font-bold">
              {price.toLocaleString()}đ
            </span>
          </p>
          
          <button className="w-full py-2 rounded-lg font-bold text-white bg-gradient-to-r from-red-500 to-purple-600/30 hover:from-purple-600/30 hover:to-red-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            MUA NGAY
          </button>
        </div>
      </div>
    );
  };
  
  export default DealCard;