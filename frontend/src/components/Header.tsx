import React from "react";
import { ShoppingCart, User, Phone, LogOut, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
      logout();
      alert("Bạn đã đăng xuất thành công!");
    }
  };

  const handleViewProducts = () => {
    // Điều hướng đến trang sản phẩm
    navigate("/products");
  };

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-3xl font-bold text-white">
          <Link to="/">NodeX-Store</Link>
        </div>

        <nav className="hidden md:flex space-x-8">
          <ul className="flex space-x-8">
            <li>
              <Link
                to="/"
                className="text-lg text-white hover:text-gray-200 font-medium transition"
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="text-lg text-white hover:text-gray-200 font-medium transition"
              >
                Danh mục
              </Link>
            </li>
            {/* Cập nhật sự kiện onClick để điều hướng tới trang sản phẩm */}
            <li>
              <button
                onClick={handleViewProducts}
                className="text-lg text-white hover:text-gray-200 font-medium transition"
              >
                Sản phẩm
              </button>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex items-center space-x-4 text-white text-lg">
          <Phone className="h-6 w-6 mr-2" />
          <span>Liên hệ hỗ trợ 1900 2154</span>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            to="/cart"
            className="flex items-center text-lg text-white hover:text-gray-200 font-medium transition"
          >
            <ShoppingCart className="h-7 w-7 mr-2" />
            Giỏ hàng
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-lg text-white">{user.name}</span>
              {user.isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center text-lg text-yellow-400 hover:text-yellow-600 font-medium transition"
                >
                  <ShieldCheck className="h-5 w-5 mr-2" />
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center text-lg text-red-400 hover:text-red-600 transition"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center text-lg text-white hover:text-gray-200 font-medium transition"
            >
              <User className="h-7 w-7 mr-2" />
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
