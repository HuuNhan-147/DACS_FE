import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductList from "../pages/ProductList";
import LoginPage from "../pages/LoginPage"; // Tạo file này nếu chưa có
const AppRoutes = () => {
  return (
    <Router>
      {" "}
      {/* Đây là nơi duy nhất chứa Router */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
