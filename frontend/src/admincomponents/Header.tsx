import React, { useState, useEffect } from "react";
import { User, LogOut, ShieldCheck, ChevronDown, Edit, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
      logout();
      alert("Bạn đã đăng xuất thành công!");
      navigate("/login");
    }
  };

  const handleToggleProfile = () => {
    setShowProfile(!showProfile);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    console.log("Dữ liệu cập nhật:", profileData);
    setIsEditing(false);
  };

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold text-white">
          <Link to="/admin">NodeX-Store</Link>
        </div>

        {/* Menu chính */}
        <nav className="hidden md:flex space-x-8">
          <ul className="flex space-x-8">
            <li>
              <Link
                to="/admin"
                className="text-lg text-white hover:text-gray-200 font-medium transition"
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className="text-lg text-white hover:text-gray-200 font-medium transition"
              >
                Quản lý sản phẩm
              </Link>
            </li>
            <li>
              <Link
                to="/admin/categories"
                className="text-lg text-white hover:text-gray-200 font-medium transition"
              >
                Quản lý danh mục
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="text-lg text-white hover:text-gray-200 font-medium transition"
              >
                Quản lý người dùng
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className="text-lg text-white hover:text-gray-200 font-medium transition"
              >
                Quản lý đơn hàng
              </Link>
            </li>
          </ul>
        </nav>

        {/* Tài khoản người dùng */}
        <div className="flex items-center space-x-6">
          {user ? (
            <div className="flex items-center space-x-4 relative">
              {/* Avatar & Tên */}
              <button
                onClick={handleToggleProfile}
                className="text-lg text-white hover:text-gray-200 font-medium transition flex items-center"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white mr-2">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                {user.name}
              </button>

              {/* Nút Admin (nếu là Admin) */}
              {user.isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center text-lg text-yellow-400 hover:text-yellow-600 font-medium transition"
                >
                  <ShieldCheck className="h-5 w-5 mr-2" />
                  Admin
                </Link>
              )}

              {/* Đăng xuất */}
              <button
                onClick={handleLogout}
                className="flex items-center text-lg text-red-400 hover:text-red-600 transition"
                title="Đăng xuất"
              >
                <LogOut className="h-5 w-5" />
              </button>

              {/* Thông tin cá nhân */}
              {showProfile && (
                <div className="absolute right-0 top-12 bg-white rounded-lg shadow-xl overflow-hidden w-72 z-50 border border-gray-200">
                  <div className="p-4 bg-gray-800 text-white flex justify-between items-center">
                    <h3 className="font-semibold text-lg">
                      Thông tin tài khoản
                    </h3>
                    <button
                      onClick={handleToggleProfile}
                      className="text-gray-300 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="p-4">
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tên
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Điện thoại
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>

                        <div className="flex justify-end space-x-2 pt-2">
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition"
                          >
                            Hủy
                          </button>
                          <button
                            onClick={handleSaveProfile}
                            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                          >
                            Lưu thay đổi
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-semibold">{user.name}</h4>
                            <p className="text-sm text-gray-600">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Cập nhật
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
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
