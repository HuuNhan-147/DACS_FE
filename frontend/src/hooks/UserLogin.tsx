import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/UserApi";
import { useAuth } from "../context/AuthContext";

const UserLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      login(data.user); // Lưu thông tin user vào Context

      // Kiểm tra nếu là admin thì chuyển hướng sang trang Admin
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/"); // Nếu không phải admin, quay về trang chủ
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, error, loading };
};

export default UserLogin;
