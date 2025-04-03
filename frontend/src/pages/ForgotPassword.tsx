import React, { useState } from "react";
import { forgotPassword } from "../api/UserApi"; // Đảm bảo đúng đường dẫn đến API
import { useNavigate } from "react-router-dom"; // Để điều hướng sang trang login sau khi gửi yêu cầu thành công

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>(""); // Để lưu email người dùng nhập vào
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái đang gửi yêu cầu
  const [error, setError] = useState<string | null>(null); // Để hiển thị lỗi nếu có
  const [message, setMessage] = useState<string | null>(null); // Để hiển thị thông báo thành công
  const navigate = useNavigate(); // Để điều hướng người dùng

  // Hàm xử lý yêu cầu quên mật khẩu
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const data = await forgotPassword(email); // Gọi API quên mật khẩu
      setMessage("Đã gửi email khôi phục mật khẩu. Vui lòng kiểm tra hộp thư.");
      setTimeout(() => navigate("/login"), 5000); // Chuyển hướng về trang đăng nhập sau 5 giây
    } catch (error: any) {
      setError(error.message); // Hiển thị lỗi nếu có
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Quên mật khẩu</h2>

      <form onSubmit={handleForgotPassword} className="space-y-4">
        {/* Input email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Nhập email của bạn"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Success Message */}
        {message && <p className="text-green-500 text-sm">{message}</p>}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Gửi yêu cầu"}
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Quay lại{" "}
          <a href="/login" className="text-blue-600 hover:text-blue-800">
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
