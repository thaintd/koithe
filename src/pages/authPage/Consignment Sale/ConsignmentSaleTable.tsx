import React from "react";
import { Table, Select, notification } from "antd";
import { useGetConsignmentSaleListQuery, useChangeInspectionStatusMutation, useChangeStatusMutation } from "../../../store/consignment sale/consignmentSaleSlice";
import { ConsignmentSale } from "../../../types/product";

const ConsignmentSaleTable: React.FC = () => {
  const { data = [], isLoading, error, refetch } = useGetConsignmentSaleListQuery();
  const [changeInspectionStatus] = useChangeInspectionStatusMutation();
  const [changeStatus] = useChangeStatusMutation();
  console.log({ data, isLoading, error });

  const handleInspectionStatusChange = async (consignmentSaleId: string, inspectionStatus: "Pending" | "Passed" | "Failed") => {
    try {
      // Change inspection status
      await changeInspectionStatus({ consignmentSaleId, inspectionStatus }).unwrap();
      refetch(); // Refetch data to update table

      // Determine new status based on inspection status
      if (inspectionStatus === "Failed") {
        // If inspection failed, change status to Cancelled
        await changeStatus({ consignmentSaleId, status: "Cancelled" }).unwrap();
        refetch(); // Refetch data to update table
      }

      notification.success({ message: "Inspection status updated successfully!" });
    } catch (error) {
      notification.error({ message: "Failed to update inspection status", description: error.message });
    }
  };

  const handleStatusChange = async (consignmentSaleId: string, status: "Cancelled") => {
    try {
      await changeStatus({ consignmentSaleId, status }).unwrap();
      refetch(); // Refetch data to update table
      notification.success({ message: "Status updated to Canceled successfully!" });
    } catch (error) {
      notification.error({ message: "Failed to update status", description: error.message });
    }
  };

  const columns = [
    {
      title: "User ID",
      dataIndex: ["userId", "_id"], // Accessing user ID from nested object
      key: "userId"
    },
    {
      title: "User Name",
      dataIndex: ["userId", "fullName"], // Accessing full name from nested object
      key: "fullName"
    },
    {
      title: "Product Name",
      dataIndex: ["productId", "productName"], // Accessing product name from nested object
      key: "productName"
    },
    {
      title: "Sale Type",
      dataIndex: "saleType",
      key: "saleType"
    },
    {
      title: "Price Agreed",
      dataIndex: "priceAgreed",
      key: "priceAgreed",
      render: (price: number) => `${price} VND`
    },
    {
      title: "Inspection Status",
      dataIndex: "inspectionStatus",
      key: "inspectionStatus",
      render: (text: string, record: ConsignmentSale) => (
        <Select
          defaultValue={text}
          onChange={(value) => handleInspectionStatusChange(record._id, value as "Pending" | "Passed" | "Failed")}
          disabled={text !== "Pending"} // Disable if inspection status is not Pending
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Passed">Passed</Select.Option>
          <Select.Option value="Failed">Failed</Select.Option>
        </Select>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: ConsignmentSale) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record._id, value as "Cancelled")}
          disabled={status === "Cancelled"} // Disable if status is already Canceled
        >
          {status === "Active" && <Select.Option value="Cancelled">Canceled</Select.Option>}
          {/* Other statuses can be added here as needed */}
        </Select>
      )
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus"
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => new Date(text).toLocaleDateString()
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: string) => new Date(text).toLocaleDateString()
    }
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return <Table columns={columns} dataSource={data} rowKey={(record: ConsignmentSale) => record._id} pagination={{ pageSize: 5 }} />;
};

export default ConsignmentSaleTable;
