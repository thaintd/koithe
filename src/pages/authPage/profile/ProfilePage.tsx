import React, { useState } from "react";
import { Dropdown, Menu, Modal, Form, Input, Flex } from "antd";
import styles from "./ProfilePage.module.scss"; // Import the SCSS module
import { SettingOutlined } from "@ant-design/icons";

const ProfilePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(""); // 'profile' or 'password'

  const showModal = (type: React.SetStateAction<string>) => {
    setModalType(type);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Handle form submission logic here
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={() => showModal("profile")}>Update Profile</Menu.Item>
      <Menu.Item onClick={() => showModal("password")}>
        Update Password
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.profileContainer}>
      <Flex
        style={{ padding: "10px" }}
        align="flex-start"
        justify="space-between"
      >
        <h2 className={styles.profileHeader}>Profile Page</h2>
        <Dropdown overlay={menu} trigger={["click"]}>
          <SettingOutlined style={{ fontSize: "20px", color: "#333" }} />
          {/* <Button className={styles.updateButton}>Update</Button> */}
        </Dropdown>
      </Flex>
      <hr />
      <div className={styles.profileInfo}>
        <p>Full Name: John Doe</p>
        <p>Username: johndoe</p>
        <p>Phone: 123-456-7890</p>
        <p>Address: 123 Main St, City, Country</p>
      </div>

      <Modal
        title={modalType === "profile" ? "Update Profile" : "Update Password"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          {modalType === "profile" ? (
            <>
              <Form.Item label="Full Name">
                <Input placeholder="Enter your full name" />
              </Form.Item>
              <Form.Item label="Username">
                <Input placeholder="Enter your username" />
              </Form.Item>
              <Form.Item label="Phone">
                <Input placeholder="Enter your phone number" />
              </Form.Item>
              <Form.Item label="Address">
                <Input placeholder="Enter your address" />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item label="Old Password">
                <Input.Password placeholder="Enter your old password" />
              </Form.Item>
              <Form.Item label="New Password">
                <Input.Password placeholder="Enter your new password" />
              </Form.Item>
              <Form.Item label="Confirm Password">
                <Input.Password placeholder="Confirm your new password" />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default ProfilePage;
