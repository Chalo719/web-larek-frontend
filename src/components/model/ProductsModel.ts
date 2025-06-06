import { IProductItem } from "../../types";
import { IProductsModel } from "../../types/model/types";
import { CDN_URL } from "../../utils/constants";
import { IEvents } from "../base/events";

export class ProductsModel implements IProductsModel {
  protected _products: IProductItem[] = [];

  constructor(protected events: IEvents) { }

  get products(): IProductItem[] {
    return this._products;
  }

  set products(products: IProductItem[]) {
    this._products = products;
    this._products.forEach(item => item.image = `${CDN_URL}${item.image.replace('.svg', '.png')}`);

    this.events.emit('products:changed');
  }

  getProduct(id: string): IProductItem {
    return this._products.find(item => item.id === id);
  }
}
