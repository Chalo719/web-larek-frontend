import { IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";

export class BasketItem extends Card {
  protected index: HTMLElement;
  protected removeButton: HTMLButtonElement;

  constructor(container: HTMLElement, productItem: IProductItem) {
    super(container, productItem);

    this.index = ensureElement('.basket__item-index', this.card);
    this.removeButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.card);
  }
}
