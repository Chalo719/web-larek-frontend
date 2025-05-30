import { IBasket, IView } from "../../types/view/types";
import { ensureElement } from "../../utils/utils";

export class Basket implements IBasket, IView {
  protected basket: HTMLElement;
  protected _products: HTMLElement[] = [];
  protected productsList: HTMLElement;
  protected totalPrice: HTMLElement;
  protected orderButton: HTMLButtonElement;

  constructor(container: HTMLElement) {
    this.basket = container;
    this.productsList = ensureElement('.basket__list', this.basket);
    this.totalPrice = ensureElement('.basket__price', this.basket);
    this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', this.basket);
  }

  set products(products: HTMLElement[]) {
    this._products.push(...products);
    this.productsList.replaceChildren(...this._products);
  }

  setTotalPrice(total: number): void {
    this.totalPrice.textContent = `${total} синапсов`;
  }

  render(): HTMLElement {
    return this.basket;
  }
}
