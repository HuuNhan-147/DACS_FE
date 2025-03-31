import React, { useState, useEffect } from "react";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";

const images = [banner1, banner2, banner3];

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[400px] bg-blue-600">
      {/* Background xanh dương mờ */}
      <div className="absolute inset-0 bg-blue-600 opacity-50"></div>

      {/* Hình ảnh thay đổi */}
      <div className="absolute inset-0 flex justify-center items-center">
        <img
          src={images[currentImage]}
          alt="Banner"
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Nút "Mua ngay" ở giữa phía dưới */}
      <div className="absolute bottom-10 w-full flex justify-center">
        <a
          href="/shop"
          className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl"
        >
          Mua ngay
        </a>
      </div>
    </section>
  );
};

export default Banner;
