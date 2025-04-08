import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import { fetchCategory } from "../api/CategoryApi";
import { ICategory } from "../types/category";

const images = [banner1, banner2, banner3];

const categoryBrands: Record<string, string[]> = {
  "Điện Thoại & Phụ Kiện": ["Iphone", "Samsung", "Xiaomi", "Oppo", "Vivo"],
  "LapTop & Máy Tính": ["Dell", "HP", "Acer", "MacBook", "Asus"],
  "Đồng Hồ": ["Rolex", "Omega", "Casio", "Seiko", "Citizen"],
  Tivi: ["Samsung", "LG", "Sony", "TCL", "Hisense"],
  "Các Phụ Kiện Khác": [
    "Tai nghe",
    "Chuột",
    "Bàn phím",
    "Sạc dự phòng",
    "Ốp lưng",
  ],
};

const priceRanges = [
  { label: "Dưới 2 triệu", min: 0, max: 2000000 },
  { label: "Từ 2 - 4 triệu", min: 2000000, max: 4000000 },
  { label: "Từ 4 - 7 triệu", min: 4000000, max: 7000000 },
  { label: "Từ 7 - 13 triệu", min: 7000000, max: 13000000 },
  { label: "Từ 13 - 20 triệu", min: 13000000, max: 20000000 },
  { label: "Trên 20 triệu", min: 20000000, max: 0 },
];

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategory();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    getCategories();

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleCategoryClick = (category: ICategory) => {
    setSelectedCategory(category);
  };

  const handleBrandClick = (brand: string) => {
    if (!selectedCategory) return;

    const searchParams = new URLSearchParams();
    searchParams.append("keyword", brand.split("(")[0].trim());
    searchParams.append("category", selectedCategory._id);
    searchParams.append("sortBy", "latest");

    navigate(`/products/search?${searchParams.toString()}`);
  };

  const handlePriceRangeClick = (priceRange: (typeof priceRanges)[0]) => {
    if (!selectedCategory) return;

    const searchParams = new URLSearchParams();
    searchParams.append("category", selectedCategory._id);
    if (priceRange.min > 0)
      searchParams.append("minPrice", priceRange.min.toString());
    if (priceRange.max > 0)
      searchParams.append("maxPrice", priceRange.max.toString());
    searchParams.append("sortBy", "latest");

    navigate(`/products/search?${searchParams.toString()}`);
  };

  const getBrandsForCategory = (categoryName: string) => {
    return categoryBrands[categoryName] || ["Không có hãng nào"];
  };

  return (
    <section className="relative w-full h-[400px] bg-white overflow-hidden">
      {/* Banner image - kept original logic */}
      <div className="absolute inset-0 bg-white/50"></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <img
          src={images[currentImage]}
          alt="Banner"
          className="max-w-full max-h-full object-contain transition-opacity duration-500"
        />
      </div>

      {/* Three-column layout */}
      <div className="relative h-full container mx-auto flex">
        {/* Categories panel - redesigned */}
        <div className="w-1/5 h-full flex items-center pl-4">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-xs">
            <h3 className="font-bold text-lg mb-3 text-blue-600 border-b pb-2">
              Danh Mục
            </h3>
            <ul className="max-h-[300px] overflow-y-auto">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className={`py-2 px-3 rounded-md cursor-pointer transition-colors ${
                    selectedCategory?._id === category._id
                      ? "bg-blue-100 text-blue-800 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main banner area - centered */}
        <div className="flex-1 flex items-center justify-center">
          {/* Empty space - image is absolute positioned */}
        </div>

        {/* Brands and prices panel */}
        {selectedCategory && (
          <div className="w-1/5 h-full flex items-center pr-4">
            <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-xs">
              <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2">
                {selectedCategory.name}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Brands column */}
                <div>
                  <h4 className="text-sm font-medium mb-2 text-gray-600">
                    Hãng
                  </h4>
                  <ul className="space-y-1">
                    {getBrandsForCategory(selectedCategory.name).map(
                      (brand, index) => (
                        <li
                          key={index}
                          className="py-1 px-2 text-blue-600 cursor-pointer hover:bg-blue-50 rounded transition-colors"
                          onClick={() => handleBrandClick(brand)}
                        >
                          {brand}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Prices column */}
                <div>
                  <h4 className="text-sm font-medium mb-2 text-gray-600">
                    Mức giá
                  </h4>
                  <ul className="space-y-1">
                    {priceRanges.map((range, idx) => (
                      <li
                        key={idx}
                        className="py-1 px-2 text-gray-700 cursor-pointer hover:bg-gray-50 rounded transition-colors"
                        onClick={() => handlePriceRangeClick(range)}
                      >
                        {range.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Shop now button */}
      <div className="absolute bottom-10 w-full flex justify-center">
        <button
          onClick={() => navigate("/products")}
          className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl"
        >
          Mua ngay
        </button>
      </div>
    </section>
  );
};

export default Banner;
