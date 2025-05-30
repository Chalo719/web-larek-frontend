import { IProductItem } from "../../types";
import { IView } from "../../types/view/types";
import { ensureElement } from "../../utils/utils";

export abstract class Card implements IView {
  protected card: HTMLElement;
  protected title: HTMLElement;
  protected price: HTMLElement;

  constructor(container: HTMLElement, productItem: IProductItem) {
    this.card = container;
    this.title = ensureElement('.card__title', this.card);
    this.price = ensureElement('.card__price', this.card);

    this.title.textContent = productItem.title;
    this.price.textContent = productItem.price === null ? "Бесценно" : `${String(productItem.price)} синапсов`;
  }

  render(): HTMLElement {
    return this.card;
  }
}
