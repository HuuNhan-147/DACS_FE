import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllOrders,
  updateOrderPaymentStatus,
  updateOrderDeliveryStatus,
  cancelOrder,
  searchOrders,
} from "../api/OrderApi";

interface Order {
  _id: string;
  orderCode: string; // 👈 THÊM DÒNG NÀY
  user: { name: string; email: string };
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
}

const AdminOrderManager: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const tokenFromStorage = localStorage.getItem("token") || "";
        setToken(tokenFromStorage);
        const data = await getAllOrders(tokenFromStorage);
        setOrders(data);
      } catch (err) {
        console.error("Lỗi khi load đơn hàng:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (searchQuery) {
          const results = await searchOrders(token, { userName: searchQuery });
          setOrders(results);
        } else {
          const data = await getAllOrders(token);
          setOrders(data);
        }
      } catch (err) {
        console.error("Lỗi khi tìm kiếm đơn hàng:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, token]);

  const handleViewDetails = (orderId: string) => {
    navigate(`/admin/orders/${orderId}`);
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) return;
    try {
      await cancelOrder(token, orderId);
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Lỗi khi xóa đơn hàng:", err);
    }
  };

  const handleUpdatePaid = async (orderId: string) => {
    try {
      await updateOrderPaymentStatus(token, orderId);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, isPaid: true } : o))
      );
    } catch (err) {
      console.error("Lỗi khi cập nhật thanh toán:", err);
    }
  };

  const handleUpdateDelivered = async (orderId: string) => {
    try {
      await updateOrderDeliveryStatus(token, orderId, true);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, isDelivered: true } : o))
      );
    } catch (err) {
      console.error("Lỗi khi cập nhật giao hàng:", err);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Quản lý đơn hàng</h1>

      {/* Thanh tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo ID hoặc tên người đặt..."
          className="border px-3 py-2 rounded w-full"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="w-full table-auto border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Người đặt</th>
              <th className="p-2 border">Tổng tiền</th>
              <th className="p-2 border">Thanh toán</th>
              <th className="p-2 border">Giao hàng</th>
              <th className="p-2 border">Ngày tạo</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="p-2 border">{order.orderCode}</td>
                <td className="p-2">
                  {order.user ? order.user.name : "Không xác định"}
                </td>
                <td className="p-2 border">
                  {order.totalPrice.toLocaleString()}đ
                </td>
                <td className="p-2 border">
                  {order.isPaid ? (
                    "✅"
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                      onClick={() => handleUpdatePaid(order._id)}
                    >
                      Đánh dấu đã thanh toán
                    </button>
                  )}
                </td>
                <td className="p-2 border">
                  {order.isDelivered ? (
                    "✅"
                  ) : (
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                      onClick={() => handleUpdateDelivered(order._id)}
                    >
                      Đánh dấu đã giao
                    </button>
                  )}
                </td>
                <td className="p-2 border">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border">
                  <button
                    className="bg-gray-700 text-white px-2 py-1 rounded text-xs mr-1"
                    onClick={() => handleViewDetails(order._id)}
                  >
                    Xem chi tiết
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrderManager;
