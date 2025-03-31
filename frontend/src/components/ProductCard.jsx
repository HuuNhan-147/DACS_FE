import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 relative p-4">
      {/* Hình ảnh sản phẩm */}
      <div className="relative pb-2/3 h-48">
        <img
          className="absolute h-full w-full object-cover"
          src={product.image}
          alt={product.name}
        />
        {/* Hiển thị "Hot" nếu sản phẩm có 5 sao */}
        {product.rating === 5 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
            HOT
          </span>
        )}
      </div>

      {/* Nội dung sản phẩm */}
      <div className="p-4">
        {/* Tên sản phẩm - TO, ĐẬM hơn */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {product.name}
        </h3>

        {/* Ghi chú - Nhỏ hơn, chữ thường */}
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>

        {/* Giá và đánh giá */}
        <div className="flex justify-between items-center">
          {/* Giá tiền - TO, ĐỎ, NỔI BẬT */}
          <span className="text-2xl font-bold text-red-600">
            {product.price.toLocaleString()} VND
          </span>

          {/* Đánh giá sao - To hơn, màu vàng */}
          <span className="text-lg font-bold text-yellow-400 flex items-center">
            ⭐ {product.rating}
          </span>
        </div>

        {/* Số lượng còn lại và nút thêm vào giỏ hàng */}
        <div className="mt-3 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Còn {product.countInStock} sản phẩm
          </span>
          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
