import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    role: string; // Ví dụ: 'admin' hoặc 'user'
  } | null;
}

// Kiểm tra và khôi phục trạng thái từ localStorage nếu có
const initialState: AuthState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth") as string)
  : {
      isAuthenticated: false,
      user: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;

      // Lưu trạng thái vào localStorage khi người dùng đăng nhập
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;

      // Xóa trạng thái khỏi localStorage khi người dùng đăng xuất
      localStorage.removeItem("auth");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
