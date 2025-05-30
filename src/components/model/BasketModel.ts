import { IProductItem } from "../../types";
import { IBasketModel } from "../../types/model/types";

export class BasketModel implements IBasketModel {
  protected _products: IProductItem[] = [];
  total: number = 0;

  constructor() { }

  get products(): IProductItem[] {
    return this._products;
  }

  addProduct(product: IProductItem): void {
    if (!this._products.find(item => item.id === product.id)) {
      this._products.push(product);
      this.total = this.getTotal();
    }
  }

  removeProduct(id: string): void {
    this._products = this._products.filter(item => item.id !== id);
    this.total = this.getTotal();
  }

  clearBasket(): void {
    this._products = [];
    this.total = 0;
  }

  getTotal(): number {
    return this._products.reduce((total, item) => {
      return total + (item.price !== null ? item.price : 0);
    }, 0)
  }

  isInBasket(id: string): boolean {
    return Boolean(this._products.find(item => item.id === id));
  }
}
