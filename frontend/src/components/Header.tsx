import React from "react";
import { ShoppingCart, User, Phone } from "lucide-react"; // Import icon mới

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Tên cửa hàng */}
        <div className="text-3xl font-bold text-white">
          <a href="/">NodeX-Store</a>
        </div>

        {/* Điều hướng trang */}
        <nav className="hidden md:flex space-x-8">
          <ul className="flex space-x-8">
            <li>
              <a
                href="/"
                className="text-lg text-white hover:text-gray-200 font-medium transition"
              >
                Trang chủ
              </a>
            </li>
            <li>
              <a
                href="/categories"
                className="text-lg text-white hover:text-gray-200 font-medium transition"
              >
                Danh mục
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="text-lg text-white hover:text-gray-200 font-medium transition"
              >
                Sản phẩm
              </a>
            </li>
          </ul>
        </nav>

        {/* Hỗ trợ & Liên hệ */}
        <div className="hidden md:flex items-center space-x-4 text-white text-lg">
          <Phone className="h-6 w-6 mr-2" />
          <span>Liên hệ hỗ trợ 1900 2154</span>
        </div>

        {/* Phần giỏ hàng & đăng nhập */}
        <div className="flex items-center space-x-6">
          {/* Giỏ hàng */}
          <a
            href="/cart"
            className="flex items-center text-lg text-white hover:text-gray-200 font-medium transition"
          >
            <ShoppingCart className="h-7 w-7 mr-2" />
            Giỏ hàng
          </a>

          {/* Đăng nhập (icon user) */}
          <a
            href="/login"
            className="flex items-center text-lg text-white hover:text-gray-200 font-medium transition"
          >
            <User className="h-7 w-7 mr-2" />
            Đăng nhập
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
