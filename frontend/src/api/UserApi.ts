import api from "../config/axios";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/users/login", { email, password });
    return response.data; // Trả về token hoặc thông tin user
  } catch (error) {
    throw new Error(error.response?.data?.message || "Đăng nhập thất bại!");
  }
};
