import React, { useState } from "react";
import { IProduct } from "../types/product";
import { AddToCartButton } from "./AddToCartButton";
interface ProductCardProps {
  product: IProduct;
}
// Import component mới

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = "/images/no-image.png";
    target.alt = "Ảnh sản phẩm không khả dụng";
    setLoading(false);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const imageUrl = product.image
    ? `http://localhost:5000${product.image}`
    : "/images/no-image.png";

  // In URL của ảnh ra console để debug
  console.log("Image URL:", imageUrl);
  const renderStars = () => {
    const stars: React.ReactElement[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i <= product.rating ? "yellow" : "gray"}
          className="w-5 h-5"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 relative p-4">
      {/* Phần hình ảnh sản phẩm */}
      <div className="relative aspect-square mb-4">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-200 opacity-75">
            <span>Đang tải ảnh...</span>
          </div>
        )}
        <img
          className="w-full h-full object-cover rounded-lg"
          src={imageUrl}
          alt={product.name}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
        />
        {product.rating === 5 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
            HOT
          </span>
        )}
      </div>

      {/* Phần thông tin sản phẩm */}
      <div className="p-2">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-red-600">
            {product.price.toLocaleString()} VND
          </span>
          <span className="flex items-center">{renderStars()}</span>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Còn {product.countInStock} sản phẩm
          </span>
          <div className="flex space-x-2">
            {/* Thay thế button cũ bằng AddToCartButton */}
            <AddToCartButton
              product={product}
              className="text-sm py-1 px-3"
              onAddToCart={() => {
                // Có thể thêm logic bổ sung khi thêm vào giỏ thành công
                console.log("Đã thêm sản phẩm vào giỏ hàng");
              }}
            />
            <button
              className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition"
              disabled={product.countInStock <= 0}
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
