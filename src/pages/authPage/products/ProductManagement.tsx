import React, { useState } from "react";
import { Button, Modal, Spin, Alert } from "antd";
import { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation } from "../../../store/product/apiSlice";
import { Product } from "../../../types/product";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";

const ProductManagement: React.FC = () => {
  const { data: products, error, isLoading: isLoading, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: isCreatingProduct }] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [visible, setVisible] = useState(false);
  console.log({ products });

  const handleEdit = (product: Partial<Product>) => {
    Modal.info({
      title: "Edit Product",
      content: <ProductForm initialValues={product} onSubmit={(updatedProduct) => (product._id ? updateProduct({ id: product._id, product: updatedProduct }) : null)} />
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = async (values: any) => {
    await createProduct(values);
    refetch();
    console.log({ values });
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)} style={{ marginBottom: 16 }}>
        Thêm sản phẩm
      </Button>
      {isLoading && <Spin />}
      {error && <Alert message="Error" description={"status" in error ? `Status: ${error.status}` : error.message || "An unknown error occurred"} type="error" />}
      <ProductTable products={products || []} onEdit={handleEdit} />
      <Modal title="Tạo sản phẩm mới" visible={visible} onCancel={() => setVisible(false)} footer={null}>
        <ProductForm initialValues={{}} onSubmit={handleCreate} isLoading={isCreatingProduct} />
      </Modal>
    </div>
  );
};

export default ProductManagement;
