import { Form, Input, Button, Select, InputNumber, Switch, Row, Col, Spin, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useGetAllCategoryQuery } from "../../../store/category/categorySlide";
import { useGetAllGenotypeQuery } from "../../../store/genotype/genotype";
import { useGetCustomersQuery } from "../../../store/user/userSlice";
import { useGetProductsQuery } from "../../../store/product/apiSlice";
import { uploadImages } from "../../../services/uploadImages";
import { useState } from "react";

const { Option } = Select;

interface ProductFormProps {
  initialValues: any;
  onSubmit: (values: any) => void;
  isLoading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit, isLoading }) => {
  const { data: categories, isLoading: isLoadingCategories, error: categoryError } = useGetAllCategoryQuery();
  const { data: genotypes, isLoading: isLoadingGenotypes, error: genotypeError } = useGetAllGenotypeQuery();
  const { data: customers, isLoading: isLoadingCustomers, error: customerError } = useGetCustomersQuery();
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { refetch } = useGetProductsQuery();
  console.log({ customers });

  if (isLoadingCategories || isLoadingGenotypes || isLoadingCustomers) {
    return <div>Loading...</div>;
  }

  if (categoryError || genotypeError || customerError) {
    return <div>Error loading data!</div>;
  }

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const imageUrls = fileList ? await uploadImages(fileList.map((file) => file.originFileObj)) : [];

      const productData = {
        productName: values.productName,
        madeBy: values.madeBy,
        gender: values.gender || false,
        size: values.size,
        yob: values.yob,
        character: values.character,
        certificates: {
          origin: values.origin,
          health_status: values.health_status,
          awards: values.awards.split(",").map((award: string) => award.trim())
        },
        screeningRate: values.screeningRate,
        foodOnDay: values.foodOnDay,
        description: values.description,
        price: values.price,
        image: imageUrls,
        categoryId: values.categoryId,
        genotypeId: values.genotypeId
      };

      console.log({ productData });

      await onSubmit(productData);
      refetch();
    } catch (error) {
      console.error("Error uploading images or submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = ({ fileList }: { fileList: any }) => setFileList(fileList);

  return (
    <Spin spinning={isLoading}>
      <Form layout="vertical" onFinish={handleFinish} initialValues={initialValues}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="productName" label="Tên sản phẩm" rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="price" label="Giá" rules={[{ required: true, message: "Vui lòng nhập giá!" }]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* <Col span={12}>
          <Form.Item name="ownerId" label="Chủ sở hữu" rules={[{ required: true, message: "Vui lòng chọn chủ sở hữu!" }]}>
            <Select placeholder="Chọn chủ sở hữu">
              {customers?.map((customer) => (
                <Option key={customer._id} value={customer._id}>
                  {customer.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col> */}
          {/* <Col span={12}>
          <Form.Item name="status" label="Tình trạng" rules={[{ required: true, message: "Vui lòng nhập tình trạng!" }]}>
            <Input />
          </Form.Item>
        </Col> */}
          <Col span={12}>
            <Form.Item name="madeBy" label="Xuất xứ" rules={[{ required: true, message: "Vui lòng nhập xuất xứ!" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="gender" label="Giới tính" valuePropName="checked">
              <Switch checkedChildren="Đực" unCheckedChildren="Cái" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="size" label="Kích thước" rules={[{ required: true, message: "Vui lòng nhập kích thước!" }]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="yob" label="Năm sinh" rules={[{ required: true, message: "Vui lòng nhập năm sinh!" }]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="character" label="Tính cách" rules={[{ required: true, message: "Vui lòng nhập tính cách!" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="origin" label="Nguồn gốc chứng chỉ" rules={[{ required: true, message: "Vui lòng nhập nguồn gốc!" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="health_status" label="Tình trạng sức khỏe" rules={[{ required: true, message: "Vui lòng nhập tình trạng sức khỏe!" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="awards" label="Giải thưởng chứng chỉ (ngăn cách bởi dấu phẩy)">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="screeningRate" label="Tỷ lệ sàng lọc" rules={[{ required: true, message: "Vui lòng nhập tỷ lệ sàng lọc!" }]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="foodOnDay" label="Lượng thức ăn trong ngày" rules={[{ required: true, message: "Vui lòng nhập lượng thức ăn!" }]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}>
              <Select placeholder="Chọn danh mục">
                {categories?.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.categoryName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="genotypeId" label="Giống" rules={[{ required: true, message: "Vui lòng chọn giống!" }]}>
              <Select placeholder="Chọn giống">
                {genotypes?.map((genotype) => (
                  <Option key={genotype._id} value={genotype._id}>
                    {genotype.genotypeName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Hình ảnh">
              <Upload
                listType="picture"
                beforeUpload={() => false} // Prevent automatic upload
                multiple
                fileList={fileList}
                onChange={handleFileChange}
              >
                <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="description" label="Mô tả">
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default ProductForm;
