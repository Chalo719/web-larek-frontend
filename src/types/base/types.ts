import { IProductList, IProductItem, IOrderResponse, IOrderRequest } from "..";

export interface IAppApi {
  getProductList(): Promise<IProductList>;
  getProductItem(id: string): Promise<IProductItem>;
  postOrder(data: IOrderRequest): Promise<IOrderResponse>;
}
