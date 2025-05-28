import { IProductList, IProductItem, IOrderData, IOrderResponse } from "../../types";
import { IAppApi } from "../../types/base/types";
import { Api } from "./api";

export class AppApi extends Api implements IAppApi {
  getProductList(): Promise<IProductList> {
    return this.get<IProductList>('/product');
  }
  getProductItem(id: string): Promise<IProductItem> {
    return this.get<IProductItem>(`/product/${id}`);
  }
  postOrder(data: IOrderData): Promise<IOrderResponse> {
    return this.post<IOrderResponse>('/order', data);
  }
}
