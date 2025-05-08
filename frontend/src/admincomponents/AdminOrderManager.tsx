import React, { useEffect, useState } from "react";
import {
  getAllOrders,
  getOrderDetails,
  updateOrderPaymentStatus,
  updateOrderDeliveryStatus,
  cancelOrder,
  searchOrders,
} from "../api/orderApi"; // Cập nhật theo dự án

interface Order {
  _id: string;
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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailData, setDetailData] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
    if (searchQuery) {
      const fetchSearchResults = async () => {
        try {
          setLoading(true);
          // Cập nhật searchQuery thành đối tượng tìm kiếm
          const searchParams = {
            userName: searchQuery, // Hoặc bất kỳ thông tin nào bạn muốn tìm kiếm
          };
          const results = await searchOrders(token, searchParams); // Truyền đối tượng vào API
          setOrders(results);
        } catch (err) {
          console.error("Lỗi khi tìm kiếm đơn hàng:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchSearchResults();
    } else {
      // Nếu không có tìm kiếm, lấy lại tất cả đơn hàng
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
    }
  }, [searchQuery, token]);

  const handleViewDetails = async (orderId: string) => {
    try {
      const details = await getOrderDetails(token, orderId);
      setDetailData(details);
      const order = orders.find((o) => o._id === orderId) || null;
      setSelectedOrder(order);
      setShowModal(true);
    } catch (err) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
    }
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

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setDetailData(null);
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
                <td className="p-2 border">{order._id.slice(0, 6)}...</td>
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
                    className="bg-gray-700 text-white px-2 py-1 rounded text-xs"
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

      {/* Modal Chi tiết đơn hàng */}
      {showModal && detailData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg relative">
            <h2 className="text-lg font-semibold mb-4">Chi tiết đơn hàng</h2>
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={closeModal}
            >
              &times;
            </button>

            <div className="space-y-2 text-sm">
              <p>
                <strong>ID:</strong> {detailData._id}
              </p>
              <p>
                <strong>Người đặt:</strong> {detailData.user?.name}
              </p>
              <p>
                <strong>Sản phẩm:</strong>
              </p>
              <ul className="list-disc list-inside ml-4">
                {detailData.orderItems?.map((item: any, idx: number) => (
                  <li key={idx}>
                    {item.name} x {item.qty} - {item.price.toLocaleString()}đ
                  </li>
                ))}
              </ul>
              <p>
                <strong>Tổng tiền:</strong>{" "}
                {typeof detailData.totalPrice === "number"
                  ? detailData.totalPrice.toLocaleString()
                  : "Không xác định"}{" "}
                đ
              </p>
              <p>
                <strong>Trạng thái:</strong>
                {detailData.isPaid ? " Đã thanh toán" : " Chưa thanh toán"} /
                {detailData.isDelivered ? " Đã giao" : " Chưa giao"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderManager;
