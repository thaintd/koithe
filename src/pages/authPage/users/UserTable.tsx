import React from "react";
import { Table, Button, Dropdown, Menu, notification } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useChangeUserStatusMutation } from "../../../store/user/userSlice";
import { User } from "../../../types/type";
import { useGetUsersQuery } from "../../../store/user/userSlice";

interface UserTableProps {
  userData: User[]; // Ensure this is defined
}

const UserTable: React.FC<UserTableProps> = ({ userData }) => {
  const [changeUserStatus] = useChangeUserStatusMutation();
  const { isLoading, isError, refetch } = useGetUsersQuery();

  const openNotification = (message: string, description: string) => {
    notification.success({
      message,
      description
    });
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading user data...</div>;
  }

  const handleMenuClick = async (key: string, record: User) => {
    try {
      if (key === "Inactive") {
        await changeUserStatus(record._id).unwrap();
        openNotification("User Deactivated", `User ${record.username} has been deactivated.`);
      } else if (key === "Active") {
        await changeUserStatus(record._id).unwrap(); // Assuming same API handles both
        openNotification("User Activated", `User ${record.username} has been activated.`);
      }

      refetch();
    } catch (error) {
      console.error("Failed to change user status:", error);
    }
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName"
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Role",
      dataIndex: ["roleId", "roleName"],
      key: "roleId"
    },
    {
      title: "Status",
      key: "status",
      render: (text: string, record: User) => {
        const menu = (
          <Menu onClick={(e) => handleMenuClick(e.key, record)}>
            <Menu.Item key="Active" disabled={String(record.status) === "Active"}>
              Activate
            </Menu.Item>
            <Menu.Item key="Inactive" disabled={String(record.status) === "Inactive"}>
              Inactivate
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button>
              {String(record.status) === "Active" ? "Active" : "Inactive"} <DownOutlined />
            </Button>
          </Dropdown>
        );
      }
    }
  ];

  return <Table dataSource={userData} columns={columns} rowKey="_id" />;
};

export default UserTable;
