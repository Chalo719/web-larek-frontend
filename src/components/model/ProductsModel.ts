import { IProductItem } from "../../types";
import { IProductsModel } from "../../types/model/types";

export class ProductsModel implements IProductsModel {
  protected _products: IProductItem[] = [];
  _preview: string | null = null;

  constructor() { }

  get products(): IProductItem[] {
    return this._products;
  }

  set products(products: IProductItem[]) {
    this._products = products;
  }

  getProduct(id: string): IProductItem {
    return this._products.find(item => item.id === id);
  }
}
