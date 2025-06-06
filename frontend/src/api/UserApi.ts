import api from "../config/axios";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/users/login", { email, password });
    return response.data; // Trả về token hoặc thông tin user
  } catch (error) {
    throw new Error(error.response?.data?.message || "Đăng nhập thất bại!");
  }
};
// Lấy thông tin profile của user
export const registerUser = async (
  email: string,
  password: string,
  name: string,
  phone: string
) => {
  try {
    const response = await api.post("/users/register", {
      email,
      password,
      name,
      phone,
    });
    return response.data; // Trả về thông tin user sau khi tạo tài khoản
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Tạo tài khoản thất bại!");
  }
};

// Quên mật khẩu
export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post("/users/forgot-password", { email });
    return response.data; // Trả về thông báo thành công, ví dụ như một thông báo gửi email thành công
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Lỗi khi gửi yêu cầu quên mật khẩu!"
    );
  }
};

export const resetPassword = async (resetToken, newPassword) => {
  try {
    const response = await api.post(
      `/users/reset-password/${resetToken}`, // Thay đổi đường dẫn URL nếu cần
      { password: newPassword }
    );
    return response.data; // Trả về thông tin thành công
  } catch (error) {
    // Lỗi API
    if (error.response) {
      throw new Error(
        error.response.data.message || "Lỗi khi thay đổi mật khẩu!"
      );
    }
    throw new Error("Lỗi kết nối đến máy chủ!");
  }
};
export const updatePassword = async (
  oldPassword: string,
  newPassword: string,
  token: string
) => {
  try {
    const response = await api.put(
      "/users/update-password",
      {
        oldPassword, // ✅ theo yêu cầu backend
        newPassword, // ✅ theo yêu cầu backend
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Cập nhật mật khẩu thất bại!"
    );
  }
};
// Cập nhật thông tin người dùng
export const updateUserProfile = async (
  updatedData: {
    name?: string;
    email?: string;
    phone?: string; // nếu có avatar hoặc trường mở rộng khác
  },
  token: string
) => {
  try {
    const response = await api.put("/users/profile", updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Trả về user sau khi cập nhật thành công
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Cập nhật thông tin thất bại!"
    );
  }
};
// Lấy danh sách tất cả người dùng (Admin)
export const getAllUsers = async (token: string) => {
  try {
    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Trả về danh sách người dùng
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Lấy danh sách người dùng thất bại!"
    );
  }
};

// Cập nhật thông tin người dùng (Admin)
export const updateUserByAdmin = async (
  userId: string,
  updatedData: {
    name?: string;
    email?: string;
    phone?: string;
    isAdmin?: boolean;
  },
  token: string
) => {
  try {
    const response = await api.put(`/users/${userId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Trả về thông tin người dùng sau khi cập nhật
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Cập nhật người dùng thất bại!"
    );
  }
};

// Xóa người dùng (Admin)
export const deleteUser = async (userId: string, token: string) => {
  try {
    const response = await api.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Trả về thông báo xóa người dùng thành công
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Xóa người dùng thất bại!"
    );
  }
};

// Lấy thông tin người dùng theo ID (Admin)
export const getUserById = async (userId: string, token: string) => {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Trả về thông tin người dùng
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Lấy thông tin người dùng thất bại!"
    );
  }
};
export const searchUsers = async (query: string, token: string) => {
  try {
    const response = await api.get(`/users/search?query=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Trả về danh sách người dùng tìm được
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Lỗi khi tìm kiếm người dùng!"
    );
  }
};
export const getUserProfile = async (token: string) => {
  try {
    const response = await api.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Trả về thông tin người dùng
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Không thể lấy thông tin người dùng!"
    );
  }
};