export interface Certificate {
  origin: string;
  health_status: string;
  awards: string[];
}

export interface Category {
  _id: string;
  categoryName: string;
  description: string;
}

export interface Genotype {
  _id: string;
  genotypeName: string;
}

export interface Product {
  certificates: Certificate;
  _id: string;
  productName: string;
  status: string;
  madeBy: string;
  gender: boolean;
  size: number;
  yob: number;
  character: string;
  screeningRate: number;
  foodOnDay: number;
  description: string;
  price: number;
  image: string[];
  categoryId: Category;
  genotypeId: Genotype;
  ownerId: string;
}
export interface ConsignmentCare {
  _id: string;
  userId: User;
  productId: Product;
  careType: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  pricePerDay: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}
export interface User {
  _id: string;
  fullName: string;
  phoneNumber: string;
  address: string;
}
export interface ConsignmentSale {
  _id: string;
  userId: string;
  productId: string;
  saleType: string;
  priceAgreed: number;
  inspectionStatus: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}
