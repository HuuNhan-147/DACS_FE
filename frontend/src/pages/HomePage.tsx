// pages/HomePage.tsx
import React from "react";
import Banner from "../components/Banner";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import Chatbot from "../components/chatbot"; // Import component Chatbot

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Banner />
        <FeaturedProducts />
      </main>
      <Chatbot /> {/* Thêm Chatbot vào trang chủ */}
      <Footer />
    </div>
  );
};

export default HomePage;
