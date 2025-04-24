import { IProductItem, IOrderData } from "..";

export interface IProductsModel {
  _products: IProductItem[];
  _preview: string | null;

  get products(): IProductItem[];
  set products(products: IProductItem[]);
  getProduct(id: string): IProductItem;
}

export interface IBasketModel {
  _products: IProductItem[];
  total: number;

  get products(): IProductItem[];
  addProduct(product: IProductItem): void;
  removeProduct(id: string): void;
  clearBasket(): void;
  getTotal(): number;
  isInBasket(id: string): boolean;
}

export interface IOrderModel {
  _order: IOrderData;

  get order(): IOrderData;
  setItems(data: Pick<IOrderData, 'items' | 'total'>): void;
  setPayment(data: Pick<IOrderData, 'payment' | 'address'>): void;
  setContacts(data: Pick<IOrderData, 'email' | 'phone'>): void;
}
