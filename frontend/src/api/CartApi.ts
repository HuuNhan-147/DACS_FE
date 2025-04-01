import api from "../config/axios"; // Import axios đã config

// Hàm thêm sản phẩm vào giỏ hàng
export const addToCart = async (
  productId: string,
  quantity: number,
  token: string
) => {
  try {
    const response = await api.post(
      "/cart/add", // URL đã được cấu hình với baseURL trong axios.ts
      { productId, quantity }, // Gửi productId và quantity trong body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header để xác thực
        },
      }
    );
    return response.data; // Trả về dữ liệu từ backend (có thể là giỏ hàng mới hoặc thông báo thành công)
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Không thể thêm vào giỏ hàng!"
    );
  }
};

// Hàm lấy giỏ hàng người dùng
export const getCart = async (token: string) => {
  try {
    const response = await api.get("/cart", {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token trong header để xác thực
      },
    });
    return response.data; // Trả về dữ liệu giỏ hàng người dùng
  } catch (error) {
    throw new Error(error.response?.data?.message || "Không thể lấy giỏ hàng!");
  }
};
