import { IProductList, IProductItem, IOrderData, IOrderResponse } from "..";

export interface IAppApi {
  getProductList(): Promise<IProductList>;
  getProductItem(id: string): Promise<IProductItem>;
  postOrder(data: IOrderData): Promise<IOrderResponse>;
}
