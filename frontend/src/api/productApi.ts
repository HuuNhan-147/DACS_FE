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
export const fetchProductDetails = async (productId: string) => {
  try {
    const response = await api.get(`/products/${productId}`); // Gọi API lấy chi tiết sản phẩm theo ID
    return response.data; // Trả về dữ liệu chi tiết sản phẩm
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    throw error; // Ném lỗi nếu có
  }
};
// Hàm gửi đánh giá sản phẩm
export const submitReview = async (
  productId: string,
  token: string,
  rating: number,
  comment: string
) => {
  try {
    // Gửi yêu cầu POST đến API để thêm đánh giá
    const response = await api.post(
      `/products/${productId}/reviews`, // Endpoint API
      {
        rating, // Gửi số sao
        comment, // Gửi nội dung đánh giá
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
        },
      }
    );

    return response.data; // Trả về phản hồi từ API, có thể là thông báo thành công
  } catch (error) {
    console.error("Lỗi khi gửi đánh giá:", error);
    throw error; // Ném lỗi nếu có
  }
};
export const getProductReviews = async (productId: string) => {
  try {
    // Gửi yêu cầu GET đến API để lấy danh sách đánh giá của sản phẩm
    const response = await api.get(`/products/${productId}/reviews`);

    return response.data; // Trả về dữ liệu danh sách đánh giá từ API
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đánh giá:", error);
    throw error; // Ném lỗi nếu có
  }
};
