import React from "react";
import { Table, Spin, Select, message } from "antd";
import { useGetBankAccountListQuery, useChangeBankAccountStatusMutation } from "../../../store/bank/bankSlice";
import { BankAccount } from "../../../types/bankAccount";

const { Option } = Select;

const BankAccountTable: React.FC = () => {
  const { data: bankAccounts, error, isLoading, refetch } = useGetBankAccountListQuery();
  console.log({ bankAccounts });
  const [changeBankAccountStatus] = useChangeBankAccountStatusMutation();

  const handleChangeStatus = async (accountId: string, status: "Active" | "Inactive") => {
    try {
      await changeBankAccountStatus({ accountId, status }).unwrap(); // Call the mutation
      message.success(`Bank account status changed to ${status}`);
      refetch(); // Refetch data to get updated list
    } catch (err) {
      message.error("Failed to change status");
    }
  };

  const columns = [
    {
      title: "Account Holder",
      dataIndex: "ownerName"
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber"
    },
    {
      title: "Bank",
      dataIndex: "bankId",
      render: (bank: { shortName: string }) => <div>{bank.shortName}</div>
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string, account: BankAccount) => (
        <Select defaultValue={status} onChange={(newStatus) => handleChangeStatus(account._id, newStatus)} style={{ width: 120 }}>
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
      )
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date: string) => new Date(date).toLocaleString()
    }
  ];

  if (isLoading) return <Spin size="large" />;
  if (error) return <div>Error fetching bank accounts: {error.message}</div>;

  return <Table dataSource={bankAccounts} columns={columns} rowKey="_id" pagination={false} />;
};

export default BankAccountTable;
