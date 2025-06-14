import { IProductItem, IOrderData } from "..";

export interface IProductsModel {
  get products(): IProductItem[];
  set products(products: IProductItem[]);
  getProduct(id: string): IProductItem;
}

export interface IBasketModel {
  get products(): IProductItem[];
  addProduct(product: IProductItem): void;
  removeProduct(id: string): void;
  clearBasket(): void;
  getTotal(): number;
  isInBasket(id: string): boolean;
  getOrderItemsIDs(): string[];
}

export interface IOrderModel {
  get order(): IOrderData;
  setPayment(data: Pick<IOrderData, 'payment' | 'address'>): void;
  setContacts(data: Pick<IOrderData, 'email' | 'phone'>): void;
}
