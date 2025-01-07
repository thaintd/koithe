import React from "react";
import { Table, Button } from "antd";
import { Coupon } from "../../../types/type";

interface CouponTableProps {
  filteredCoupons: Coupon[];
  onEdit: (coupon: Coupon) => void; // Add onEdit handler for editing coupon
}

const CouponTable: React.FC<CouponTableProps> = ({ filteredCoupons, onEdit }) => {
  const columns = [
    {
      title: "Tên Coupon",
      dataIndex: "couponName",
      key: "couponName"
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code"
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "validFrom",
      key: "validFrom",
      render: (text: string) => new Date(text).toLocaleString()
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "validTo",
      key: "validTo",
      render: (text: string) => new Date(text).toLocaleString()
    },
    {
      title: "Tỉ lệ giảm giá (%)",
      dataIndex: "discountRate",
      key: "discountRate"
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (status === 1 ? "Hoạt động" : "Không hoạt động")
    },
    {
      title: "Hành động",
      key: "action",
      render: (text: any, record: Coupon) => <Button onClick={() => onEdit(record)}>Chỉnh sửa</Button>
    }
  ];

  return <Table columns={columns} dataSource={filteredCoupons} rowKey="_id" />;
};

export default CouponTable;
