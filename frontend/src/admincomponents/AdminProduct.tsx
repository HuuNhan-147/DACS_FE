import React, { useState, useEffect } from "react";
import { IProduct } from "../types/product";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { deleteProduct } from "../api/productApi"; // API xóa sản phẩm

interface ProductCardProps {
  product: IProduct;
  onDelete: (productId: string) => void; // Hàm xử lý xóa sản phẩm
}

const AdminProduct: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [shippingPrice, setShippingPrice] = useState<number>(0);
  const { getToken } = useAuth(); // Lấy hàm getToken từ context
  const navigate = useNavigate();

  // Hàm xử lý lỗi khi ảnh không tải được
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = "/images/no-image.png"; // Thay ảnh khi không có ảnh sản phẩm
    target.alt = "Ảnh sản phẩm không khả dụng";
    setLoading(false);
  };

  // Hàm khi ảnh tải thành công
  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleEdit = () => {
    // Chuyển hướng đến trang cập nhật sản phẩm và truyền thông tin sản phẩm
    navigate(`/admin/product/update/${product._id}`);
  };

  // Hàm xóa sản phẩm với xác nhận
  const handleDelete = async () => {
    const token = getToken(); // Lấy token từ AuthContext
    if (!token) {
      navigate("/login");
      return;
    }

    // Xác nhận xóa sản phẩm
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (!confirmed) return;

    // Gọi API xóa sản phẩm
    try {
      await deleteProduct(product._id, token); // Truyền product._id và token vào API xóa sản phẩm
      onDelete(product._id); // Cập nhật lại danh sách sản phẩm sau khi xóa
      alert("Sản phẩm đã được xóa thành công!");
    } catch (error) {
      console.error("Không thể xóa sản phẩm", error);
      alert("Không thể xóa sản phẩm. Vui lòng thử lại!");
    }
  };

  const imageUrl = product.image
    ? `http://localhost:5000${product.image}` // URL ảnh sản phẩm
    : "/images/no-image.png";

  // Hàm render sao (đánh giá sao)
  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={i < product.rating ? "yellow" : "gray"}
        width="20"
        height="20"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ));
  };

  useEffect(() => {
    const shipping = product.price * 0.05; // Tính phí vận chuyển
    setShippingPrice(shipping);
  }, [product]);

  return (
    <div className="product-card">
      {/* Phần hình ảnh sản phẩm */}
      <div>
        {loading && <div>Đang tải ảnh...</div>}
        <img
          src={imageUrl}
          alt={product.name}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
          style={{ cursor: "pointer" }}
        />
        {product.rating === 5 && <span>HOT</span>}
      </div>

      {/* Phần thông tin sản phẩm */}
      <div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div>
          <span>{product.price.toLocaleString()} VND</span>
          <span>{renderStars()}</span>
        </div>

        <div>
          <span>Còn {product.countInStock} sản phẩm</span>
          <div>
            {/* Thay nút "Mua ngay" bằng nút Sửa và Xóa */}
            <button onClick={handleEdit} className="btn-edit">
              xem chi tiết
            </button>
            <button
              onClick={handleDelete}
              className="btn-delete"
              disabled={product.countInStock <= 0}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
