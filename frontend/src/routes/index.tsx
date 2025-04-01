import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductList from "../components/FeaturedProducts";
import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage"; // Import trang Admin
import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/Layout";
import CartPage from "../pages/CartPage"; // Import trang giỏ hàng
const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/search" element={<ProductList />} />{" "}
            <Route path="/products" element={<ProductList />} />{" "}
            {/* ✅ Route chính xác */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
