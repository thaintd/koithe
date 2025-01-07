import React, { useState, useEffect } from "react";
import { Input, Select, Spin, Button } from "antd";
import { Coupon } from "../../../types/type"; // Assuming you have a Coupon type defined
import { SearchOutlined } from "@ant-design/icons";
import { useGetAllCouponQuery } from "../../../store/coupon/couponSlice";
import CouponTable from "./CouponTable";
import AddCoupon from "./AddCoupon";
import EditCoupon from "./EditCoupon"; // Import EditCoupon modal

const { Option } = Select;

const CouponManage: React.FC = () => {
  const { data: couponData, isLoading, isError } = useGetAllCouponQuery();
  const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(undefined);
  const [isAddCouponModalVisible, setIsAddCouponModalVisible] = useState(false);
  const [isEditCouponModalVisible, setIsEditCouponModalVisible] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    if (couponData) {
      const filtered = couponData.filter((coupon) => {
        const matchesSearch = coupon.couponName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus !== undefined ? coupon.status === selectedStatus : true;

        return matchesSearch && matchesStatus;
      });
      setFilteredCoupons(filtered);
    }
  }, [searchQuery, selectedStatus, couponData]);

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError) {
    return <div>Lỗi khi tải dữ liệu coupon...</div>;
  }

  const handleAddCouponModalOpen = () => {
    setIsAddCouponModalVisible(true);
  };

  const handleAddCouponModalClose = () => {
    setIsAddCouponModalVisible(false);
  };

  const handleEditCouponModalOpen = (coupon: Coupon) => {
    setSelectedCoupon(coupon); // Set the coupon to edit
    setIsEditCouponModalVisible(true);
  };

  const handleEditCouponModalClose = () => {
    setIsEditCouponModalVisible(false);
    setSelectedCoupon(null); // Reset selected coupon after closing modal
  };

  return (
    <div>
      <Input placeholder="Tìm kiếm theo tên coupon" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ marginBottom: 16, width: "300px" }} size="large" prefix={<SearchOutlined />} />
      <Select placeholder="Lọc theo trạng thái" style={{ width: 200, marginBottom: 16, marginLeft: 16 }} onChange={(value) => setSelectedStatus(value)} allowClear>
        <Option value={1}>Hoạt động</Option>
        <Option value={0}>Không hoạt động</Option>
      </Select>
      <Button type="primary" onClick={handleAddCouponModalOpen} style={{ marginLeft: 16 }}>
        Thêm coupon
      </Button>
      <CouponTable filteredCoupons={filteredCoupons} onEdit={handleEditCouponModalOpen} /> {/* Pass edit handler */}
      <AddCoupon visible={isAddCouponModalVisible} onClose={handleAddCouponModalClose} />
      {selectedCoupon && <EditCoupon visible={isEditCouponModalVisible} onClose={handleEditCouponModalClose} coupon={selectedCoupon} />}
    </div>
  );
};

export default CouponManage;
