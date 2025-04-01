import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideHeaderRoutes = ["/login"]; // Danh sách các trang không hiển thị Header

  // Kiểm tra để hiển thị Header chỉ khi không phải ở các route trong danh sách hideHeaderRoutes
  return (
    <>
      {/* Hiển thị Header chỉ khi không phải ở route login */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      {children}
    </>
  );
};

export default Layout;
