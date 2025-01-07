import { Table, Modal, Form, Input, Button, Select, notification } from "antd";
import { Product } from "../../../types/product";
import React, { useState } from "react";
import { useUpdateProductMutation, useGetProductsQuery } from "../../../store/product/apiSlice";
import { useGetCustomersQuery } from "../../../store/user/userSlice";

const { Option } = Select;

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { data: customers } = useGetCustomersQuery(); // Fetch customer data
  console.log({ customers });
  const { refetch } = useGetProductsQuery();

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentProduct(null);
  };

  const statusTransitions: { [key: string]: string[] } = {
    Available: ["Unavailable", "Sold", "Consigned Sale", "Consigned Care"],
    "Consigned Sale": ["Consigned Sold"],
    "Consigned Care": ["Consigned Returned"],
    Unavailable: []
  };

  const handleOk = async (values: Partial<Product>) => {
    if (currentProduct) {
      const currentStatus = currentProduct.status;
      const newStatus = values.status;

      // Check if the status change is valid
      if (newStatus && !statusTransitions[currentStatus]?.includes(newStatus)) {
        notification.error({
          message: "Cập nhật thất bại",
          description: `Trạng thái không thể chuyển từ "${currentStatus}" sang "${newStatus}".`
        });
        return;
      }

      // Check if the ownerId is provided when status is Sold or Consigned Sale
      if ((newStatus === "Sold" || newStatus === "Consigned Sale" || newStatus === "Consigned Care" || newStatus === "Consigned Returned" || newStatus === "Consigned Sold") && !values.ownerId) {
        notification.error({
          message: "Cập nhật thất bại",
          description: "Vui lòng cung cấp ID chủ sở hữu khi cập nhật trạng thái là 'Đã bán' hoặc 'Bán ký gửi'."
        });
        return;
      }

      const updatedProduct = {
        ...currentProduct,
        productName: values.productName,
        price: values.price,
        gender: values.gender,
        size: values.size,
        yob: values.yob,
        status: newStatus || currentStatus,
        madeBy: values.madeBy,
        ownerId: values.ownerId || currentProduct.ownerId // Use selected ownerId
      };

      try {
        await updateProduct({ id: currentProduct._id, product: updatedProduct }).unwrap();
        notification.success({
          message: "Cập nhật thành công",
          description: "Sản phẩm đã được cập nhật thành công!"
        });

        await refetch();
        handleCancel();
      } catch (error) {
        notification.error({
          message: "Cập nhật thất bại",
          description: "Đã có lỗi xảy ra khi cập nhật sản phẩm!"
        });
      }
    }
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
      width: 200
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text: number) => <span>{text} VND</span>,
      width: 120
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (text: boolean) => <span>{text ? "Đực" : "Cái"}</span>,
      width: 100
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
      width: 120
    },
    {
      title: "Năm sinh",
      dataIndex: "yob",
      key: "yob",
      width: 100
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusMap: { [key: string]: string } = {
          Available: "Có sẵn",
          Sold: "Đã bán",
          "Consigned Sale": "Bán ký gửi",
          "Consigned Care": "Chăm sóc ký gửi",
          "Consigned Sold": "Đã bán ký gửi",
          "Consigned Returned": "Trở về ký gửi",
          Unavailable: "Không có sẵn"
        };
        return <span>{statusMap[status] || status}</span>;
      },
      width: 120
    },
    {
      title: "Xuất xứ",
      dataIndex: "madeBy",
      key: "madeBy",
      width: 200
    },
    {
      title: "Chủ sở hữu",
      dataIndex: "ownerId",
      key: "ownerId",
      render: (ownerId: string) => {
        const owner = customers?.find((customer) => customer._id === ownerId?._id);
        return <span>{owner?.fullName || "Không có"}</span>;
      },
      width: 150
    }
  ];

  return (
    <>
      <Table
        dataSource={products}
        columns={columns}
        rowKey={(record) => record._id}
        onRow={(record) => ({
          onClick: () => handleEdit(record)
        })}
        scroll={{ x: "max-content" }}
        pagination={false}
      />

      {currentProduct && (
        <Modal title="Chỉnh sửa sản phẩm" visible={isModalVisible} onCancel={handleCancel} width={800} footer={null}>
          <Form initialValues={currentProduct} onFinish={handleOk}>
            <Form.Item name="productName" label="Tên sản phẩm" rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Giá" rules={[{ required: true, message: "Vui lòng nhập giá!" }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="gender" label="Giới tính">
              <Select defaultValue={currentProduct.gender ? "Đực" : "Cái"}>
                <Option value={true}>Đực</Option>
                <Option value={false}>Cái</Option>
              </Select>
            </Form.Item>
            <Form.Item name="size" label="Kích thước">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="yob" label="Năm sinh">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="status" label="Trạng thái">
              <Select defaultValue={currentProduct.status}>
                <Option value="Available">Có sẵn</Option>
                <Option value="Sold">Đã bán</Option>
                <Option value="Consigned Sale">Bán ký gửi</Option>
                <Option value="Consigned Care">Chăm sóc ký gửi</Option>
                <Option value="Consigned Sold">Đã bán ký gửi</Option>
                <Option value="Consigned Returned">Trở về ký gửi</Option>
                <Option value="Unavailable">Không có sẵn</Option>
              </Select>
            </Form.Item>
            <Form.Item name="ownerId" label="Chọn Chủ Sở Hữu" rules={[{ required: currentProduct?.status === "Sold" || currentProduct?.status === "Consigned Sale", message: "Vui lòng chọn chủ sở hữu!" }]}>
              <Select placeholder="Chọn khách hàng" allowClear>
                {customers?.map((customer) => (
                  <Option key={customer._id} value={customer._id}>
                    {customer.fullName} {/* Assuming customer has a 'name' property */}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="madeBy" label="Xuất xứ">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Lưu
              </Button>
              <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
                Hủy
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ProductTable;
