import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../pages/specialPage/NotFoundPage";
import UnauthorizedPage from "../pages/specialPage/UnauthorizedPage";

import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import ProfilePage from "../pages/authPage/profile/ProfilePage";
import Dashboard from "../pages/authPage/dashboard/Dashboard";
import UserManage from "../pages/authPage/users/UserManage";
import ProductManagement from "../pages/authPage/products/ProductManagement";
import OrderManagement from "../pages/authPage/oders/OrderManagement";
import CouponManage from "../pages/authPage/coupons/CouponManage";
import ConsignmentCareTable from "../pages/authPage/Consignment Care/ConsignmentCareTable";
import ConsignmentSaleTable from "../pages/authPage/Consignment Sale/ConsignmentSaleTable";
import WithdrawTable from "../pages/authPage/Withdraw/WithdrawTable";
import BankAccountTable from "../pages/authPage/Bank Account/BankAccountTable";

// Import layouts
import MainLayout from "../layouts/MainLayout/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import AuthGuard from "./authGuard";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <MainLayout>
              <HomePage />
            </MainLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/login"
        element={
          <AuthGuard>
            <MainLayout>
              <LoginPage />
            </MainLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/auth/profile"
        element={
          <AuthGuard>
            <MainLayout>
              <AuthLayout>
                <ProfilePage />
              </AuthLayout>
            </MainLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/auth/dashboard"
        element={
          <AuthGuard>
            <MainLayout>
              <AuthLayout>
                <Dashboard />
              </AuthLayout>
            </MainLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/auth/users"
        element={
          <AuthGuard>
            <MainLayout>
              <AuthLayout>
                <UserManage />
              </AuthLayout>
            </MainLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/auth/products"
        element={
          <AuthGuard>
            <MainLayout>
              <AuthLayout>
                <ProductManagement />
              </AuthLayout>
            </MainLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/auth/orders"
        element={
          <AuthGuard>
            <MainLayout>
              <AuthLayout>
                <OrderManagement />
              </AuthLayout>
            </MainLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/auth/coupons"
        element={
          <AuthGuard>
            <MainLayout>
              <AuthLayout>
                <CouponManage />
              </AuthLayout>
            </MainLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/auth/consignment-care"
        element={
          <AuthGuard>
            <MainLayout>
              <AuthLayout>
                <ConsignmentCareTable />
              </AuthLayout>
            </MainLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/auth/consignment-sale"
        element={
          <AuthGuard>
            <MainLayout>
              <AuthLayout>
                <ConsignmentSaleTable />
              </AuthLayout>
            </MainLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/auth/withdraw"
        element={
          <AuthGuard>
            <MainLayout>
              <AuthLayout>
                <WithdrawTable />
              </AuthLayout>
            </MainLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/auth/bank"
        element={
          <AuthGuard>
            <MainLayout>
              <AuthLayout>
                <BankAccountTable />
              </AuthLayout>
            </MainLayout>
          </AuthGuard>
        }
      />
      {/* Other Routes */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
