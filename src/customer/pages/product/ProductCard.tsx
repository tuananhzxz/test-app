import React, { useEffect, useState } from 'react';
import "./ProductCard.css";
import { Button } from '@mui/material';
import { 
  FavoriteBorderOutlined, 
  ModeCommentOutlined, 
  ShoppingCart, 
  Star 
} from '@mui/icons-material';

const images = [
  "https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288869.jpg",
  "https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288883.jpg",
  "https://i.guim.co.uk/img/media/31e8a4f29cfa05815a0554102be993d41075828a/0_748_3263_2800/master/3263.jpg?width=620&quality=85&auto=format&fit=max&s=8759c6794bddb364c7e1c57da311db97"
];

const ProductCard = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval : any;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
      }, 1000);
    } else {
      clearInterval(interval);
      interval = null;
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="group w-[250px]"> {/* Changed to fixed width */}
      <div className="card relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {images.map((item, index) => (
          <img
            key={index}
            style={{
              transform: `translateX(${(index - currentImage) * 100}%)`
            }}
            className="card-media object-top"
            src={item}
            alt="product"
          />
        ))}

        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold transform rotate-[-3deg] shadow-md">
          -50%
        </div>

        <div className="absolute top-4 right-4 bg-[#3f51b5] text-white px-3 py-1 rounded-lg text-sm font-bold transform rotate-[3deg] shadow-md">
          HOT
        </div>

        {isHovered && (
          <div className="indicator flex flex-col items-center space-y-2">
            <div className="flex gap-3 animate-fadeIn">
              <Button 
                variant="contained" 
                sx={{
                  backgroundColor: '#3f51b5',
                  '&:hover': {
                    backgroundColor: 'red',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s'
                }}
              >
                <FavoriteBorderOutlined />
              </Button>
              <Button 
                variant="contained"
                sx={{
                  backgroundColor: '#3f51b5',
                  '&:hover': {
                    backgroundColor: 'red',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s'
                }}
              >
                <ModeCommentOutlined />
              </Button>
            </div>
          </div>
        )}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`indicator-button ${currentImage === index ? 'active' : ''}`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </div>

      <div className="details w-full pt-3 space-y-2 group-hover-effect rounded-md bg-white"> {/* Added w-full */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} sx={{ color: '#ffd700', fontSize: '16px' }} />
          ))}
          <span className="text-sm text-gray-500 ml-1">(150)</span>
        </div>

        <div className="name">
          <h1 className="text-lg font-semibold text-gray-800 hover:text-[#3f51b5] transition-colors">Hello</h1>
          <p className="text-gray-600">Cutee hihi</p>
        </div>

        <div className="price flex items-center gap-3">
          <span className="font-sans text-xl font-bold text-red-600">
            400.000đ
          </span>
          <span className="thin-line-through text-gray-400">
            800.000đ
          </span>
          <span className="text-[#3f51b5] font-semibold">
            50%
          </span>
        </div>

        <button className="w-full mt-2 py-2 bg-[#3f51b5] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition-colors group">
          <ShoppingCart className="group-hover:animate-bounce" />
          <span>Thêm vào giỏ</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;