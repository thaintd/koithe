export interface User {
  fullName: string;
  phoneNumber: string;
  address: string;
}

export interface Order {
  userId: User;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}
