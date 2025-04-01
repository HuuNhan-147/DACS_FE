import api from "../config/axios"; // Import axios đã config

export const fetchProducts = async () => {
  try {
    const response = await api.get("/products"); // Không cần baseURL nữa
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    throw error;
  }
};
export const fetchChatbotResponse = async (question) => {
  try {
    const response = await api.post("/chatbot", { question }); // Gửi câu hỏi đến backend chatbot
    return response.data.response; // Trả về phản hồi từ backend (HTML hoặc văn bản)
  } catch (error) {
    console.error("Lỗi khi gọi API chatbot:", error);
    throw error;
  }
};
