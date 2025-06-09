import { IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "./Card";

export class BasketItem extends Card {
  protected index: HTMLElement;
  protected removeButton: HTMLButtonElement;

  constructor(container: HTMLElement, productItem: IProductItem, index: number, protected events: IEvents) {
    super(container, productItem);

    this.index = ensureElement('.basket__item-index', this.card);
    this.removeButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.card);

    this.index.textContent = String(index);

    this.removeButton.addEventListener('click', () => this.events.emit('product:removed', { id: productItem.id }));
  }
}
