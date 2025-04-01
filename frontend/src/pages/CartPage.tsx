import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getCart } from "../api/CartApi";
import { ShoppingCart, Trash2, ArrowLeft, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string; // Tên file hình ảnh trả về từ backend
    countInStock: number;
  };
  quantity: number;
}

interface CartData {
  cart: {
    _id: string;
    user: string;
    cartItems: CartItem[];
    createdAt: string;
    updatedAt: string;
  };
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

const CartPage = () => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const token = getToken();
    const fetchCart = async () => {
      if (!token) {
        setError("Vui lòng đăng nhập để xem giỏ hàng!");
        setLoading(false);
        return;
      }

      try {
        const response = await getCart(token);
        setCartData(response);
      } catch (error) {
        console.error(error);
        setError("Không thể lấy thông tin giỏ hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [getToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <Link
          to="/login"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  if (!cartData || cartData.cart.cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-medium text-gray-900 mb-2">
          Giỏ hàng của bạn đang trống
        </h2>
        <p className="text-gray-600 mb-6">
          Hãy khám phá cửa hàng và thêm sản phẩm vào giỏ hàng!
        </p>
        <Link
          to="/products"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Giỏ hàng của bạn
        </h1>
        <div className="flex items-center text-gray-600">
          <Link to="/" className="hover:text-blue-600">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <span className="text-blue-600">Giỏ hàng</span>
        </div>
      </div>

      <div className="lg:flex gap-8">
        {/* Danh sách sản phẩm */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Header bảng */}
            <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 text-gray-600 font-medium">
              <div className="col-span-5">Sản phẩm</div>
              <div className="col-span-2 text-center">Đơn giá</div>
              <div className="col-span-3 text-center">Số lượng</div>
              <div className="col-span-2 text-center">Thành tiền</div>
            </div>

            {/* Danh sách sản phẩm */}
            {cartData.cart.cartItems.map((item) => (
              <div
                key={item.product._id}
                className="grid grid-cols-12 p-4 border-b border-gray-200 items-center"
              >
                {/* Hình ảnh và tên sản phẩm */}
                <div className="col-span-12 md:col-span-5 flex items-center">
                  <img
                    src={`http://localhost:5000${item.product.image}`} // Sử dụng đường dẫn để hiển thị hình ảnh
                    alt={item.product.name}
                    className="w-20 h-20 object-contain rounded mr-4"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {item.product.name}
                    </h3>
                    <button className="flex items-center text-red-600 text-sm mt-1 hover:text-red-800">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Xóa
                    </button>
                  </div>
                </div>

                {/* Giá sản phẩm */}
                <div className="col-span-4 md:col-span-2 mt-4 md:mt-0 text-gray-900 md:text-center">
                  {item.product.price.toLocaleString()}₫
                </div>

                {/* Số lượng */}
                <div className="col-span-4 md:col-span-3 mt-4 md:mt-0">
                  <div className="flex items-center justify-center">
                    <button
                      className={`p-2 rounded-l border ${
                        item.quantity <= 1
                          ? "bg-gray-100 text-gray-400"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 border-t border-b bg-white text-center w-12">
                      {item.quantity}
                    </span>
                    <button
                      className={`p-2 rounded-r border ${
                        item.quantity >= item.product.countInStock
                          ? "bg-gray-100 text-gray-400"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  {item.quantity >= item.product.countInStock && (
                    <p className="text-xs text-red-600 mt-1 text-center">
                      Đã đạt số lượng tối đa
                    </p>
                  )}
                </div>

                {/* Thành tiền */}
                <div className="col-span-4 md:col-span-2 mt-4 md:mt-0 text-gray-900 font-medium md:text-center">
                  {(item.product.price * item.quantity).toLocaleString()}₫
                </div>
              </div>
            ))}
          </div>

          {/* Tiếp tục mua sắm */}
          <div className="mt-4">
            <Link
              to="/products"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>

        {/* Thanh toán */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Tóm tắt đơn hàng
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính:</span>
                <span className="text-gray-900">
                  {cartData.itemsPrice.toLocaleString()}₫
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển:</span>
                <span className="text-gray-900">
                  {cartData.shippingPrice.toLocaleString()}₫
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thuế (10%):</span>
                <span className="text-gray-900">
                  {cartData.taxPrice.toLocaleString()}₫
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between font-medium text-lg">
                  <span>Tổng cộng:</span>
                  <span className="text-blue-600">
                    {cartData.totalPrice.toLocaleString()}₫
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Tiến hành thanh toán
            </button>

            <p className="text-xs text-gray-500 mt-4">
              Bằng cách nhấn vào nút trên, bạn đồng ý với Điều khoản & Điều kiện
              của chúng tôi
            </p>
          </div>

          {/* Mã giảm giá */}
          <div className="bg-white rounded-lg shadow p-6 mt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Mã giảm giá
            </h3>
            <div className="flex">
              <input
                type="text"
                placeholder="Nhập mã giảm giá"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-gray-800 text-white px-4 py-2 rounded-r-lg hover:bg-gray-700 transition">
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
