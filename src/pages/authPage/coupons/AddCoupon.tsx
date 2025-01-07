import React from "react";
import { Modal, Form, Input, DatePicker, InputNumber, Button, message } from "antd";
import { useCreateCouponMutation, useGetAllCouponQuery } from "../../../store/coupon/couponSlice"; // Adjust the import path as necessary

interface AddCouponProps {
  visible: boolean;
  onClose: () => void;
}

const AddCoupon: React.FC<AddCouponProps> = function (props) {
  const createCoupon = useCreateCouponMutation()[0]; // Get createCoupon directly
  const form = Form.useForm()[0]; // Get the form instance directly
  const { refetch } = useGetAllCouponQuery(); // Fetch coupons to refetch after adding a new coupon

  const handleFinish = async (values: any) => {
    try {
      // Create coupon object explicitly without destructuring
      const couponData = {
        couponName: values.couponName,
        code: values.code,
        validFrom: values.validFrom.toISOString(),
        validTo: values.validTo.toISOString(),
        discountRate: values.discountRate,
        status: values.status,
        description: values.description
      };
      console.log({ couponData });
      await createCoupon(couponData).unwrap();
      message.success("Coupon added successfully!");
      form.resetFields();
      props.onClose(); // Use props.onClose() instead of destructured onClose
      await refetch(); // Refetch coupons to reload the coupon
    } catch (error) {
      message.error("Failed to add coupon.");
    }
  };

  return (
    <Modal title="Add Coupon" visible={props.visible} onCancel={props.onClose} footer={null}>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item name="couponName" label="Coupon Name" rules={[{ required: true, message: "Please enter the coupon name!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="code" label="Code" rules={[{ required: true, message: "Please enter the coupon code!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="validFrom" label="Valid From" rules={[{ required: true, message: "Please select a valid from date!" }]}>
          <DatePicker showTime />
        </Form.Item>
        <Form.Item name="validTo" label="Valid To" rules={[{ required: true, message: "Please select a valid to date!" }]}>
          <DatePicker showTime />
        </Form.Item>
        <Form.Item name="discountRate" label="Discount Rate (%)" rules={[{ required: true, message: "Please enter the discount rate!" }]}>
          <InputNumber min={0} max={100} />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select the coupon status!" }]}>
          <InputNumber min={0} max={1} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Coupon
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCoupon;
