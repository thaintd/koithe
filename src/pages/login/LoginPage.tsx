import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { notification, Spin } from "antd";
import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router-dom";
import logoKoi from "../../assets/images/koi-the.webp";
import { useLoginMutation } from "../../store/user/userSlice";
import { JwtPayload } from "../../types/type";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: NotificationType, message: string, description: string) => {
    api[type]({
      message: message,
      description: description,
      showProgress: true,
    });
  };

  const handleLogin = async () => {
    if (username && password) {
      try {
        const result = await login({ username, password }).unwrap(); // unwrap() để lấy trực tiếp kết quả trả về
        if (result.message === "Login successful") {
          const decoded: JwtPayload = jwtDecode(result.token);
          localStorage.setItem("token", result.token);
          localStorage.setItem("fullName", decoded.fullName);
          localStorage.setItem("roleName", decoded.roleName);
          openNotification("success", result.message, "Welcome to KoiTheShop.");
          navigate("/auth/dashboard"); // Điều hướng tới trang dashboard
        }
      } catch (error) {
        openNotification("error", "Login failed", "Please try again.");
      }
    } else {
      openNotification("warning", "Username or password is missing", "Please fill all to continue.");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      {contextHolder}
      <div className={styles.imageSection}>
        <img
          src={logoKoi}
          alt="Login Illustration"
        />
      </div>
      <div className={styles.formSection}>
        <Spin spinning={isLoading}>
          <div>
            <h1>Welcome to Koi-Thé</h1>
            <div className={styles.formGroup}>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <button onClick={handleLogin}>Login</button>
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default LoginPage;
