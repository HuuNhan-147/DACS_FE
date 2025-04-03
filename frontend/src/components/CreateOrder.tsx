import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IProduct } from "../types/product";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../api/OrderApi";
import { CheckCircle2 } from "lucide-react";

interface IShippingAddress {
  fullname: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

interface IOrderData {
  shippingAddress: IShippingAddress;
  paymentMethod: string;
}

const CreateOrderPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [orderData, setOrderData] = useState<IOrderData>({
    shippingAddress: {
      fullname: "",
      phone: "",
      address: "",
      city: "",
      country: "Vietnam",
    },
    paymentMethod: "VNPay", // Giữ nguyên phương thức thanh toán
  });

  const [products, setProducts] = useState<IProduct[]>([]); // Mảng sản phẩm
  const [product, setProduct] = useState<IProduct | null>(null); // Sản phẩm mua ngay
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (location.state?.products) {
      setProducts(location.state.products); // Set mảng sản phẩm từ CartPage
      console.log("Sản phẩm từ giỏ hàng:", location.state.products);
    } else if (location.state?.product) {
      setProduct(location.state.product); // Nếu chỉ có một sản phẩm duy nhất
      console.log("Sản phẩm từ mua ngay:", location.state.product);
    } else {
      navigate("/products");
    }
  }, [location, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrderSuccess(false);

    const token = getToken();
    if (!token) {
      setError("Vui lòng đăng nhập để tiếp tục");
      setLoading(false);
      return;
    }

    // Nếu không có sản phẩm nào, hiển thị lỗi
    if (products.length === 0 && !product) {
      setError("Không có sản phẩm nào!");
      setLoading(false);
      return;
    }

    try {
      const orderPayload = {
        orderItems: products.length
          ? products.map((prod) => ({
              name: prod.name,
              quantity: prod.quantity, // Lấy số lượng từ giỏ hàng
              image: prod.image,
              price: prod.price,
              product: prod._id,
            }))
          : [
              {
                name: product?.name || "",
                quantity: 1,
                image: product?.image || "",
                price: product?.price || 0,
                product: product?._id || "",
              },
            ],
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
      };

      await createOrder(token, orderPayload);
      setOrderSuccess(true); // Chỉ hiển thị thông báo thành công, không chuyển hướng thanh toán
    } catch (err: any) {
      console.error("Error creating order:", err);
      setError(err.message || "Đã xảy ra lỗi khi tạo đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-green-600">
            Đặt hàng thành công!
          </h1>
          <p className="text-gray-600 mb-6">
            Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/orders")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Xem đơn hàng
            </button>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Tạo Đơn Hàng</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Thông tin giao hàng
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                name="fullname"
                value={orderData.shippingAddress.fullname}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Số điện thoại
              </label>
              <input
                type="text"
                name="phone"
                value={orderData.shippingAddress.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Địa chỉ
            </label>
            <input
              type="text"
              name="address"
              value={orderData.shippingAddress.address}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* City */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Thành phố
              </label>
              <input
                type="text"
                name="city"
                value={orderData.shippingAddress.city}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Country (disabled) */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Quốc gia
              </label>
              <input
                type="text"
                value={orderData.shippingAddress.country}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                disabled
              />
            </div>
          </div>

          {/* Payment Method (giữ nguyên nhưng không xử lý thanh toán) */}
          <div className="mb-6 mt-6">
            <label className="block text-gray-700 font-medium mb-2">
              Phương thức thanh toán
            </label>
            <select
              value={orderData.paymentMethod}
              onChange={(e) =>
                setOrderData((prev) => ({
                  ...prev,
                  paymentMethod: e.target.value,
                }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="VNPay">VNPay (Chuyển khoản)</option>
              <option value="COD">COD (Thanh toán khi nhận hàng)</option>
            </select>
          </div>

          {/* Product Information */}
          {(product || products.length > 0) && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="text-md font-semibold text-gray-800 mb-3">
                Thông tin sản phẩm
              </h3>
              {product ? (
                <div className="flex space-x-4 items-center">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{product.name}</h4>
                    <p className="text-sm text-gray-600">
                      Giá: {product.price.toLocaleString("vi-VN")} VND
                    </p>
                  </div>
                </div>
              ) : (
                products.map((prod) => (
                  <div
                    key={prod._id}
                    className="flex space-x-4 items-center mb-4"
                  >
                    {" "}
                    {/* Đã thêm key và margin-bottom */}
                    <img
                      src={`http://localhost:5000${prod.image}`}
                      alt={prod.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">{prod.name}</h4>
                      <p className="text-sm text-gray-600">
                        Giá: {prod.price.toLocaleString("vi-VN")} VND
                      </p>
                      <p className="text-sm text-gray-600">
                        Số lượng: {prod.quantity}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đặt hàng ngay"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateOrderPage;
