export interface IProductList {
  total: number;
  items: IProductItem[];
}

export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IOrderData {
  payment: PaymentMethod;
  address: string;
  email: string;
  phone: string;
}

export interface IOrderRequest {
  items: string[];
  total: number;
  payment: PaymentMethod;
  email: string;
  phone: string;
  address: string;
}

export interface IOrderResponse {
  id: string;
  total: number;
}

export type PaymentMethod = "card" | "cash";
