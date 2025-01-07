export interface Bank {
  _id: string;
  name: string;
  code: string;
  shortName: string;
  logo: string;
}

export interface BankAccount {
  _id: string;
  bankId: Bank;
  accountNumber: string;
  ownerName: string;
}

export interface User {
  _id: string;
  fullName: string;
  phoneNumber: string;
  address: string;
}

export interface Product {
  _id: string;
  productName: string;
}

export interface ConsignmentSale {
  _id: string;
  productId: Product;
  saleType: string;
  priceAgreed: number;
  inspectionStatus: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface Withdraw {
  _id: string;
  bankAccountId: BankAccount;
  userId: User;
  consignmentSaleId: ConsignmentSale;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
