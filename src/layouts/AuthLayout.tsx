import { ConfigProvider, Layout, Menu } from "antd";
import { ShoppingCartOutlined, TagOutlined, UsergroupAddOutlined, LineChartOutlined, ProductOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "/auth/dashboard",
      icon: <LineChartOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/auth/dashboard")
    },
    {
      key: "/auth/users",
      icon: <UsergroupAddOutlined />,
      label: "Users",
      onClick: () => navigate("/auth/users")
    },
    {
      key: "/auth/products",
      icon: <ProductOutlined />,
      label: "Products",
      onClick: () => navigate("/auth/products")
    },
    {
      key: "/auth/orders",
      icon: <ShoppingCartOutlined />,
      label: "Orders",
      onClick: () => navigate("/auth/orders")
    },
    {
      key: "/auth/coupons",
      icon: <TagOutlined />,
      label: "Coupons",
      onClick: () => navigate("/auth/coupons")
    },
    {
      key: "/auth/consignment-care",
      icon: <LineChartOutlined />,
      label: "Consignment Care",
      onClick: () => navigate("/auth/consignment-care")
    },
    {
      key: "/auth/consignment-sale",
      icon: <UsergroupAddOutlined />,
      label: "Consignment Sale",
      onClick: () => navigate("/auth/consignment-sale")
    },
    {
      key: "/auth/withdraw",
      icon: <ProductOutlined />,
      label: "Withdraw",
      onClick: () => navigate("/auth/withdraw")
    },
    {
      key: "/auth/bank",
      icon: <ShoppingCartOutlined />,
      label: "Bank",
      onClick: () => navigate("/auth/bank")
    }
  ];

  return (
    <Layout style={{ padding: "0px 0px", minHeight: "calc(100vh - 80px)" }}>
      <Sider width={300}>
        <ConfigProvider
          theme={{
            token: {
              colorText: "#efe9cf",
              fontSize: 18
            },
            components: {
              Menu: {
                itemSelectedBg: "#fff",
                iconMarginInlineEnd: 20,
                itemSelectedColor: "#333"
              }
            }
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["/auth/dashboard"]}
            style={{
              height: "100%",
              backgroundColor: "#4d5652",
              fontWeight: "500"
            }}
            items={menuItems}
          />
        </ConfigProvider>
      </Sider>
      <Layout>
        <Content style={{ padding: "2%" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AuthLayout;
