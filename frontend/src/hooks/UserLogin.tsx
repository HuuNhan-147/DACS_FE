import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/UserApi"; // Import hàm login

const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null); // Thêm state lưu thông tin user
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token); // Lưu token vào localStorage
      localStorage.setItem("user", JSON.stringify(data.user)); // Lưu thông tin user
      setUser(data.user); // Cập nhật state user
      navigate("/"); // Chuyển hướng sau khi đăng nhập
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, error, loading, user };
};

export default useLogin;
