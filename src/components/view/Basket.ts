import { IBasket, IView } from "../../types/view/types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export class Basket implements IBasket, IView {
  protected basket: HTMLElement;
  protected _products: HTMLElement[] = [];
  protected productsList: HTMLElement;
  protected totalPrice: HTMLElement;
  protected orderButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    this.basket = container;
    this.productsList = ensureElement('.basket__list', this.basket);
    this.totalPrice = ensureElement('.basket__price', this.basket);
    this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', this.basket);

    this.orderButton.addEventListener('click', () => this.events.emit('order:opened'));
  }

  set products(products: HTMLElement[]) {
    this._products = products;
    this.productsList.replaceChildren(...this._products);
  }

  setTotalPrice(total: number): void {
    this.totalPrice.textContent = `${total} синапсов`;
  }

  render(): HTMLElement {
    if (this._products.length === 0 || this.totalPrice.textContent === '0 синапсов') {
      this.orderButton.setAttribute('disabled', 'true');
    } else {
      this.orderButton.removeAttribute('disabled');
    }

    return this.basket;
  }
}
