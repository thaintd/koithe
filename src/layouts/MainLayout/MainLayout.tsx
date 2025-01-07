import React from "react";
import styles from "./MainLayout.module.scss";
import { useNavigate } from "react-router-dom";
import logoKoi from "../../assets/images/koi-the.webp";
import { Avatar, Flex, Typography, Space, Dropdown, MenuProps } from "antd";
import {
  UserOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const fullName = localStorage.getItem("fullName");

  const items: MenuProps['items'] = [
    {
      label: (
        <span>Welcome, {fullName}</span>
      ),
      key: '1',
    },
    {
      label: (
        <p
          onClick={() => {
            navigate("/auth/profile")
          }}
        >
          Profile
        </p>
      ),
      key: "Profile",
    },
    {
      label: (
        <p
          onClick={() => {
            localStorage.clear();
            navigate("/login")
          }}
        >
          Logout
        </p>
      ),
      key: 'Logout',
      icon: <LogoutOutlined />,
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.mainLayout}>
      <header className={styles.header}>
        <Flex
          justify="space-between"
          align="center"
          className={styles.headerContent}
        >
          <img
            onClick={() => handleNavigation("/")}
            src={logoKoi}
            alt="Logo"
            className={styles.logo}
          />
          <nav className={styles.nav}>
            {!token &&
              <div
                className={styles.navItem}
                onClick={() => handleNavigation("/login")}
              >
                Login
              </div>
            }
            {token && <Dropdown menu={{ items }} placement="bottomRight">
              <div className={styles.navItem}>
                <Avatar
                  style={{ backgroundColor: "#48757e", verticalAlign: "middle" }}
                  size="large"
                  icon={<UserOutlined />}
                />
              </div>
            </Dropdown>}
          </nav>
        </Flex>
      </header>
      <main className={styles.main}>{children}</main>
      {!token && <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <img src={logoKoi} alt="Logo" className={styles.footerLogo} />
            <Title level={4} style={{ color: "white" }}>Koi Fish Store</Title>
            <ul className={styles.footerContactList}>
              <li>123 Koi Street, Fishville, FK 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@koifishstore.com</li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <Title level={4}>Follow Us</Title>
            <Space size="large" className={styles.socialIcons}>
              <FacebookOutlined />
              <InstagramOutlined />
              <TwitterOutlined />
            </Space>
          </div>
        </div>
        <div className={styles.copyright}>
          <Text className={styles.copyrightText}>&copy; 2024 Koi Fish Store. All rights reserved.</Text>
        </div>
      </footer>}
    </div>
  );
}
