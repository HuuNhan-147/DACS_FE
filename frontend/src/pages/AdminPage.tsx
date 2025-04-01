import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const AdminPage = () => {
  // Hàm onSearch rỗng vì Admin không cần tìm kiếm
  const handleSearch = () => {};

  return (
    <div>
      <Header /> {/* Truyền onSearch vào Header */}
      {/* Nội dung trang Admin */}
      <div>
        <h1>Trang quản trị</h1>
        {/* Các thành phần khác của trang Admin */}
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
