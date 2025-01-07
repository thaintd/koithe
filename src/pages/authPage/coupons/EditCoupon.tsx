import React, { useEffect } from "react";
import { Modal, Form, Input, DatePicker, InputNumber, Button, message } from "antd";
import moment from "moment"; // Ensure moment is installed to handle date manipulation
import { useEditCouponMutation, useGetAllCouponQuery } from "../../../store/coupon/couponSlice";

interface EditCouponProps {
  visible: boolean;
  onClose: () => void;
  coupon: any; // Use your coupon type here
}

const EditCoupon: React.FC<EditCouponProps> = ({ visible, onClose, coupon }) => {
  const [updateCoupon] = useEditCouponMutation(); // Mutation to update coupon
  const [form] = Form.useForm();
  const { refetch } = useGetAllCouponQuery(); // Fetch coupons to refetch after updating a coupon

  useEffect(() => {
    if (coupon) {
      // Pre-fill the form with coupon data
      form.setFieldsValue({
        couponName: coupon.couponName,
        code: coupon.code,
        validFrom: coupon.validFrom ? moment(coupon.validFrom) : null, // Convert ISO string to moment
        validTo: coupon.validTo ? moment(coupon.validTo) : null, // Convert ISO string to moment
        discountRate: coupon.discountRate,
        status: coupon.status,
        description: coupon.description
      });
    }
  }, [coupon, form]);

  const handleFinish = async (values: any) => {
    try {
      // Build coupon data with ISO strings for validFrom and validTo
      const couponData = {
        couponName: values.couponName,
        code: values.code,
        validFrom: values.validFrom.toISOString(), // Convert moment to ISO string
        validTo: values.validTo.toISOString(), // Convert moment to ISO string
        discountRate: values.discountRate,
        status: values.status,
        description: values.description
      };
      console.log({ couponData });
      await updateCoupon({ id: coupon._id, coupon: couponData }).unwrap(); // Call API to update coupon
      message.success("Cập nhật coupon thành công!");
      form.resetFields();
      onClose(); // Close modal after update
      await refetch(); // Refetch coupons to reload the coupon
    } catch (error) {
      message.error("Cập nhật coupon thất bại.");
    }
  };

  return (
    <Modal title="Chỉnh sửa Coupon" visible={visible} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item name="couponName" label="Tên coupon" rules={[{ required: true, message: "Nhập tên coupon!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="code" label="Mã" rules={[{ required: true, message: "Nhập mã coupon!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="validFrom" label="Ngày bắt đầu" rules={[{ required: true, message: "Chọn ngày bắt đầu!" }]}>
          <DatePicker showTime />
        </Form.Item>
        <Form.Item name="validTo" label="Ngày kết thúc" rules={[{ required: true, message: "Chọn ngày kết thúc!" }]}>
          <DatePicker showTime />
        </Form.Item>
        <Form.Item name="discountRate" label="Tỉ lệ giảm giá (%)" rules={[{ required: true, message: "Nhập tỉ lệ giảm giá!" }]}>
          <InputNumber min={0} max={100} />
        </Form.Item>
        <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: "Chọn trạng thái coupon!" }]}>
          <InputNumber min={0} max={1} />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCoupon;
