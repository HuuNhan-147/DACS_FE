import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Banner />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
