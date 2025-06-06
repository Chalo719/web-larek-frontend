import { IProductItem } from "../../types";
import { IBasketModel } from "../../types/model/types";
import { IEvents } from "../base/events";

export class BasketModel implements IBasketModel {
  protected _products: IProductItem[] = [];
  protected _total: number = 0;

  constructor(protected events: IEvents) { }

  get products(): IProductItem[] {
    return this._products;
  }

  get total(): number {
    return this._total;
  }

  addProduct(product: IProductItem): void {
    if (!this._products.find(item => item.id === product.id)) {
      this._products.push(product);
      this._total = this.getTotal();

      this.events.emit('basket:changed');
    }
  }

  removeProduct(id: string): void {
    this._products = this._products.filter(item => item.id !== id);
    this._total = this.getTotal();
    this.events.emit('basket:changed');
  }

  clearBasket(): void {
    this._products = [];
    this._total = 0;
    this.events.emit('basket:changed');
  }

  private getTotal(): number {
    return this._products.reduce((total, item) => {
      return total + (item.price !== null ? item.price : 0);
    }, 0)
  }

  isInBasket(id: string): boolean {
    return Boolean(this._products.find(item => item.id === id));
  }
}
