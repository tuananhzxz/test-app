import { Product } from "../../../../state/customer/ProductCustomerSlice";

interface ProductQuery {
  type: string;
  color?: string;
  size?: string;
  category?: string;
  minRating?: number;
  maxPrice?: number;
  minPrice?: number;
  minDiscount?: number;
  minQuantity?: number;
}

interface ConversationContext {
  recentTopics: string[];
  userPreferences: {
    preferredCategories: string[];
    preferredSizes: string[];
    priceRange?: { min: number; max: number };
    preferredRating?: number;
    preferredDiscount?: number;
  };
  lastInteraction: number;
}

export const analyzeUserMessage = (message: string): boolean => {
  const productKeywords = [
    'giá', 'sản phẩm', 'mua', 'đặt hàng', 'chi tiết', 'thông tin',
    'áo', 'quần', 'váy', 'size', 'đánh giá', 'giảm giá', 'còn hàng',
    'khuyến mãi', 'review', 'số lượng', 'tồn kho', 'bán chạy'
  ];
  const message_lower = message.toLowerCase();
  return productKeywords.some(keyword => message_lower.includes(keyword));
};

const parseProductQuery = (message: string): ProductQuery => {
  const message_lower = message.toLowerCase();
  const query: ProductQuery = {
    type: 'unknown'
  };

  // Phân tích loại sản phẩm
  if (message_lower.includes('áo')) query.type = 'áo';
  else if (message_lower.includes('quần')) query.type = 'quần';
  else if (message_lower.includes('váy')) query.type = 'váy';

  // Phân tích màu sắc
  const colors = ['đen', 'trắng', 'đỏ', 'xanh', 'vàng', 'hồng', 'tím', 'xám'];
  colors.forEach(color => {
    if (message_lower.includes(color)) query.color = color;
  });

  // Phân tích size
  const sizes = ['s', 'm', 'l', 'xl', 'xxl'];
  sizes.forEach(size => {
    if (message_lower.includes(size)) query.size = size;
  });

  // Phân tích đánh giá
  if (message_lower.includes('đánh giá tốt') || message_lower.includes('review tốt')) {
    query.minRating = 4;
  } else if (message_lower.includes('đánh giá')) {
    const ratingMatch = message_lower.match(/(\d+)\s*sao/);
    if (ratingMatch) {
      query.minRating = parseInt(ratingMatch[1]);
    }
  }

  const priceMatch = message_lower.match(/(\d+)k?\s*-\s*(\d+)k?/);
  if (priceMatch) {
    query.minPrice = parseInt(priceMatch[1]) * (message_lower.includes('k') ? 1000 : 1);
    query.maxPrice = parseInt(priceMatch[2]) * (message_lower.includes('k') ? 1000 : 1);
  }

  // Phân tích giảm giá
  if (message_lower.includes('giảm giá') || message_lower.includes('khuyến mãi')) {
    const discountMatch = message_lower.match(/giảm\s*(\d+)%/);
    if (discountMatch) {
      query.minDiscount = parseInt(discountMatch[1]);
    } else {
      query.minDiscount = 10; // Mặc định tìm sản phẩm giảm ít nhất 10%
    }
  }

  // Phân tích số lượng còn lại
  if (message_lower.includes('còn hàng') || message_lower.includes('tồn kho')) {
    query.minQuantity = 1;
  }

  return query;
};

const findMatchingProducts = (query: ProductQuery, products: Product[]): Product[] => {
  return products.filter(product => {
    const productLower = product.title.toLowerCase();
    const descriptionLower = product.description.toLowerCase();
    
    const typeMatch = query.type === 'unknown' || productLower.includes(query.type);
    const colorMatch = !query.color || descriptionLower.includes(query.color);
    const sizeMatch = !query.size || descriptionLower.includes(query.size);
    
    const ratingMatch = !query.minRating || 
      (product.reviews.length > 0 && 
       (product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length) >= query.minRating);
    
    const priceMatch = (!query.minPrice || product.sellingPrice >= query.minPrice) &&
                      (!query.maxPrice || product.sellingPrice <= query.maxPrice);
    
    const discountMatch = !query.minDiscount || product.discountPercent >= query.minDiscount;
    
    const quantityMatch = !query.minQuantity || product.quantity > 0;

    return typeMatch && colorMatch && sizeMatch && ratingMatch && priceMatch && discountMatch && quantityMatch;
  });
};

const generateProductCards = (products: Product[]): string => {
  if (products.length === 0) return '';

  return products.map(product => {
    const formattedTitle = product.title.toLowerCase().replace(/ /g, '-');
    const avgRating = product.reviews.length > 0 
      ? (product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length).toFixed(1)
      : 'Chưa có đánh giá';
    
    return `
      <div class="product-card" onclick="window.location.href='/product-details/${formattedTitle}/${product.description}/${product.id}'">
        <img src="${product.images[0]}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>Giá: ${product.sellingPrice.toLocaleString()}đ</p>
        ${product.discountPercent > 0 ? `<p class="discount">Giảm ${product.discountPercent}%</p>` : ''}
        <p>${product.description}</p>
        <p>Đánh giá: ${avgRating} ⭐ (${product.numRatings} lượt)</p>
        <p>Còn lại: ${product.quantity} sản phẩm</p>
      </div>
    `;
  }).join('');
};

// Các mẫu câu trả lời cho các tình huống khác nhau
const RESPONSE_TEMPLATES = {
  NO_PRODUCTS: [
    "Xin lỗi, tôi không tìm thấy sản phẩm phù hợp với yêu cầu của bạn. Bạn có thể mô tả chi tiết hơn không?",
    "Hiện tại chúng tôi chưa có sản phẩm nào phù hợp với yêu cầu của bạn. Bạn có muốn xem các sản phẩm tương tự không?",
    "Rất tiếc, tôi không tìm thấy sản phẩm như bạn mong muốn. Bạn có thể thử tìm với tiêu chí khác không?"
  ],
  PRICE_INFO: [
    "Đây là thông tin giá của các sản phẩm phù hợp:",
    "Tôi đã tìm thấy một số sản phẩm với mức giá phù hợp:",
    "Dưới đây là các sản phẩm trong tầm giá bạn quan tâm:"
  ],
  DISCOUNT_INFO: [
    "Các sản phẩm đang có chương trình giảm giá:",
    "Tôi đã tìm được những sản phẩm đang khuyến mãi:",
    "Đây là danh sách các sản phẩm đang được giảm giá:"
  ],
  RATING_INFO: [
    "Các sản phẩm có đánh giá tốt từ khách hàng:",
    "Những sản phẩm được đánh giá cao nhất:",
    "Dưới đây là các sản phẩm được nhiều khách hàng yêu thích:"
  ]
};

// Helper function để chọn ngẫu nhiên một mẫu câu
const getRandomResponse = (type: keyof typeof RESPONSE_TEMPLATES): string => {
  const templates = RESPONSE_TEMPLATES[type];
  return templates[Math.floor(Math.random() * templates.length)];
};

export const generateProductResponse = (
  message: string, 
  products: Product[], 
  context: ConversationContext
): string => {
  const query = parseProductQuery(message);
  
  if (context.userPreferences.priceRange) {
    query.minPrice = query.minPrice || context.userPreferences.priceRange.min;
    query.maxPrice = query.maxPrice || context.userPreferences.priceRange.max;
  }
  
  if (context.userPreferences.preferredRating) {
    query.minRating = query.minRating || context.userPreferences.preferredRating;
  }

  const matchedProducts = findMatchingProducts(query, products);

  if (matchedProducts.length === 0) {
    return getRandomResponse('NO_PRODUCTS');
  }

  let response = '';
  if (message.toLowerCase().includes('giảm giá')) {
    response = getRandomResponse('DISCOUNT_INFO');
  } else if (message.toLowerCase().includes('đánh giá') || message.toLowerCase().includes('review')) {
    response = getRandomResponse('RATING_INFO');
  } else if (message.toLowerCase().includes('giá')) {
    response = getRandomResponse('PRICE_INFO');
  } else {
    response = "Tôi đã tìm thấy một số sản phẩm phù hợp với yêu cầu của bạn:\n\n";
  }

  response += generateProductCards(matchedProducts);
  response += "\n\nBạn có thể click vào sản phẩm để xem chi tiết. Tôi có thể giúp gì thêm cho bạn không?";

  return response;
};