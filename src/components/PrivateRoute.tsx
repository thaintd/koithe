import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

// Component để bảo vệ route, yêu cầu người dùng phải đăng nhập
const PrivateRoute: React.FC<{ requiredRole?: string }> = ({
  requiredRole,
}) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Nếu người dùng không có quyền truy cập (ví dụ: không phải admin), chuyển hướng
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />; // Nếu người dùng có quyền, render nội dung của route
};

export default PrivateRoute;
