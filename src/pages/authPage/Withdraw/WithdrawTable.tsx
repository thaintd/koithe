import React from "react";
import { Table, Spin, Select, message } from "antd";
import { useGetWithdrawListQuery, useChangeWithdrawStatusMutation } from "../../../store/withdraw/withdrawSlice";
import { Withdraw } from "../../../types/withdraw";

const { Option } = Select;

const WithdrawTable: React.FC = () => {
  const { data: withdraws, error, isLoading, refetch } = useGetWithdrawListQuery();
  const [changeWithdrawStatus] = useChangeWithdrawStatusMutation();

  const handleChangeStatus = async (withdrawId: string, status: "Pending" | "Completed" | "Cancelled") => {
    try {
      await changeWithdrawStatus({ withdrawId, status }).unwrap(); // Call the mutation
      message.success(`Withdraw status changed to ${status}`);
      refetch(); // Refetch data to get updated list
    } catch (err) {
      message.error("Failed to change status");
    }
  };

  const columns = [
    {
      title: "User",
      dataIndex: "userId",
      render: (user: { fullName: string }) => user.fullName
    },
    {
      title: "Account Number",
      dataIndex: "bankAccountId",
      render: (account: { accountNumber: string }) => account.accountNumber
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (amount: number) => `${amount} VND`
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string, withdraw: Withdraw) => (
        <Select defaultValue={status} onChange={(newStatus) => handleChangeStatus(withdraw._id, newStatus)} style={{ width: 120 }}>
          <Option value="Pending">Pending</Option>
          <Option value="Completed">Completed</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      )
    }
  ];

  if (isLoading) return <Spin size="large" />;
  if (error) return <div>Error fetching withdraws: {error.message}</div>;

  return <Table dataSource={withdraws} columns={columns} rowKey="_id" pagination={false} />;
};

export default WithdrawTable;
