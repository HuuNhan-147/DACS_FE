import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductList from "../components/FeaturedProducts";
import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/Layout";
import CartPage from "../pages/CartPage";
import ListOrderPage from "../pages/ListOrderPage";
import PaymentResult from "../pages/PaymentPage";
import OrderPage from "../pages/OrderPage";
import Chatbot from "../components/chatbot"; // ✅ Import Chatbot
import ProductDetail from "../components/ProductDetail";
import Register from "../pages/RegisterPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/search" element={<ProductList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<ListOrderPage />} />
            <Route path="/payment-result" element={<PaymentResult />} />
            <Route path="/create" element={<OrderPage />} />
            <Route path="/products/:id" element={<ProductDetail />} />{" "}
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:resetToken"
              element={<ResetPassword />}
            />
            {/* Chi tiết sản phẩm */}
          </Routes>

          {/* ✅ Chatbot luôn hiển thị trên mọi trang */}
          <Chatbot />
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
