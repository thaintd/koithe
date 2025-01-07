import React from "react";
import { Card, Col, Row, Spin } from "antd";
import { format } from "../../../store/dashboard/utils/format";
import { useGetDashboardDataQuery } from "../../../store/dashboard/dashboard";
const Dashboard: React.FC = () => {
  const { data, error, isLoading } = useGetDashboardDataQuery();

  if (isLoading) return <Spin size="large" />;
  if (error) return <div>Error loading dashboard data</div>;

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Khách hàng" bordered>
            <h2>{data?.customers}</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Sản phẩm" bordered>
            <h2>{data?.products}</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Đơn hàng" bordered>
            <h2>{data?.orders}</h2>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={8}>
          <Card title="Chăm sóc hàng gửi" bordered>
            <h2>{data?.consignmentCares}</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Bán hàng gửi" bordered>
            <h2>{data?.consignmentSales}</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Doanh thu tổng" bordered>
            <h2>{format(data?.totalRevenue || 0)}</h2>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
