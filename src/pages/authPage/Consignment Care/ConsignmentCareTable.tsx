import React from "react";
import { Table, Dropdown, Menu, Button, message, Typography } from "antd";
import { useGetConsignmentCareListQuery, useChangeConsignmentCareStatusMutation } from "../../../store/consignment care/consignmentCareSlice";
import { ConsignmentCare } from "../../../types/product";

const { Text } = Typography;

const ConsignmentCareTable: React.FC = () => {
  const { data = [], isLoading, error } = useGetConsignmentCareListQuery();
  const [changeConsignmentCareStatus] = useChangeConsignmentCareStatusMutation();

  const handleStatusChange = async (consignmentCareId: string) => {
    try {
      await changeConsignmentCareStatus({ consignmentCareId, status: "Returned" }).unwrap();
      message.success("Status changed to Returned successfully");
    } catch (err) {
      message.error("Failed to change status");
    }
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: ["userId", "fullName"],
      key: "fullName"
    },
    {
      title: "Phone Number",
      dataIndex: ["userId", "phoneNumber"],
      key: "phoneNumber"
    },
    {
      title: "Product Name",
      dataIndex: ["productId", "productName"],
      key: "productName"
    },
    {
      title: "Care Type",
      dataIndex: "careType",
      key: "careType"
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text: string) => new Date(text).toLocaleDateString()
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text: string) => new Date(text).toLocaleDateString()
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: ConsignmentCare) =>
        status === "Returned" ? (
          <Text style={{ width: 120, display: "inline-block", textAlign: "center" }}>Returned</Text>
        ) : (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="returned" onClick={() => handleStatusChange(record._id)}>
                  Set to Returned
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button type="link" style={{ width: 120, textAlign: "center" }}>
              {status} (Change)
            </Button>
          </Dropdown>
        )
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus"
    }
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return <Table columns={columns} dataSource={data} rowKey={(record: ConsignmentCare) => record._id} pagination={{ pageSize: 5 }} />;
};

export default ConsignmentCareTable;
