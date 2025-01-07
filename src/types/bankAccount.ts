export interface User {
  _id: string;
  fullName: string;
  phoneNumber: string;
  address: string;
}

export interface Bank {
  _id: string;
  name: string;
  code: string;
  shortName: string;
  logo: string;
}

export interface BankAccount {
  _id: string;
  userId: User;
  bankId: Bank;
  accountNumber: string;
  ownerName: string;
  status: "Active" | "Inactive"; // You can include other statuses if needed
  createdAt: string; // or Date if you plan to convert it
  updatedAt: string; // or Date if you plan to convert it
  __v: number;
}
