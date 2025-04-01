import React, { useState } from "react";
import { IProduct } from "../types/product";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [loading, setLoading] = useState<boolean>(true); // Thêm trạng thái loading

  // Xử lý khi ảnh không load được
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = "/images/no-image.png";
    target.alt = "Ảnh sản phẩm không khả dụng";
    setLoading(false); // Đặt trạng thái là không còn loading khi ảnh lỗi
  };

  // Xử lý khi ảnh đã tải thành công
  const handleImageLoad = () => {
    setLoading(false); // Khi ảnh load thành công, bỏ trạng thái loading
  };

  // Tạo đường dẫn đầy đủ cho ảnh từ backend
  const imageUrl = product.image
    ? `http://localhost:5000${product.image}` // Backend trả về đường dẫn tương đối, cần kết hợp với URL gốc
    : "/images/no-image.png"; // Nếu không có ảnh, sử dụng ảnh mặc định

  // Hiển thị ngôi sao theo rating
  const renderStars = () => {
    const stars: React.ReactElement[] = []; // Khai báo mảng stars có kiểu là JSX.Element[]
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i <= product.rating ? "yellow" : "gray"} // Tô vàng cho các ngôi sao theo rating
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
      <div className="relative h-48 mb-4">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-200 opacity-75">
            <span>Đang tải ảnh...</span>{" "}
            {/* Hiển thị thông báo khi ảnh đang tải */}
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
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
              disabled={product.countInStock <= 0}
            >
              {product.countInStock > 0 ? "Thêm vào giỏ" : "Hết hàng"}
            </button>
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
