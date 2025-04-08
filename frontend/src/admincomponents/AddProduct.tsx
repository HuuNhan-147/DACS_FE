import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Giả sử bạn đã có context Auth để lấy token
import { addProduct } from "../api/productApi"; // API thêm sản phẩm
import { fetchCategory } from "../api/CategoryApi"; // API lấy danh mục sản phẩm

const AddProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [countInStock, setCountInStock] = useState<number>(10);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  ); // Lưu trữ danh sách danh mục
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true); // Trạng thái tải danh mục

  const { getToken } = useAuth();
  const navigate = useNavigate();

  // Lấy danh mục sản phẩm từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchCategory();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục sản phẩm:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]); // Lưu ảnh đã chọn
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      alert("Bạn cần đăng nhập!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("description", description);
    formData.append("category", category);
    formData.append("rating", rating.toString());
    formData.append("countInStock", countInStock.toString());
    if (image) formData.append("image", image);

    try {
      await addProduct(formData, token); // Gọi API thêm sản phẩm
      alert("Sản phẩm đã được thêm thành công!");
      navigate("/admin/products"); // Chuyển hướng đến trang danh sách sản phẩm
    } catch (error) {
      alert("Không thể thêm sản phẩm. Vui lòng thử lại!");
    }
  };

  return (
    <div>
      <h1>Thêm Sản Phẩm Mới</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Giá sản phẩm:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Mô tả:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Danh mục:</label>
          {loadingCategories ? (
            <p>Đang tải danh mục...</p>
          ) : (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <label>Đánh giá:</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
            min="1"
            max="5"
          />
        </div>
        <div>
          <label>Số lượng còn lại:</label>
          <input
            type="number"
            value={countInStock}
            onChange={(e) => setCountInStock(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Ảnh sản phẩm:</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit">Thêm sản phẩm</button>
      </form>
    </div>
  );
};

export default AddProduct;
