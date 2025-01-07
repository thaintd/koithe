/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Table, Tag, Spin, Alert } from "antd";
import { useGetOrdersQuery } from "../../../store/product/apiSlice";

const OrderManagement: React.FC = () => {
  const { data: orders, error, isLoading } = useGetOrdersQuery();
  console.log({ orders });

  const columns = [
    {
      title: "Khách hàng",
      render: (text: any, record: any) => (
        <span>
          {record.userId.fullName} <br />
          {record.userId.phoneNumber} <br />
          {record.userId.address}
        </span>
      )
    },
    {
      title: "Nhân viên xử lý",
      render: (text: any, record: any) => <span>{record.staffId ? record.staffId.fullName : "Chưa phân công"}</span>
    },
    {
      title: "Tổng giá",
      dataIndex: "totalPrice",
      render: (text: number) => <span>{text} VND</span>
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) => {
        // eslint-disable-next-line prefer-const
        let color = status === "Pending" ? "orange" : "green";
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "paymentStatus",
      render: (paymentStatus: string) => {
        // eslint-disable-next-line prefer-const
        let color = paymentStatus === "Pending" ? "orange" : "green";
        return <Tag color={color}>{paymentStatus}</Tag>;
      }
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (date: string) => <span>{new Date(date).toLocaleString()}</span>
    }
  ];

  return (
    <div>
      {isLoading && <Spin />}
      {error && <Alert message="Error" type="error" />}
      <Table dataSource={orders} columns={columns} rowKey={(record) => record.userId.phoneNumber} loading={isLoading} />
    </div>
  );
};

export default OrderManagement;
