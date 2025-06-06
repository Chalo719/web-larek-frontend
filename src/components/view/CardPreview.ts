import { IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { GalleryItem } from "./GalleryItem";

export class CardPreview extends GalleryItem {
  protected description: HTMLElement;
  protected basketButton: HTMLButtonElement;

  constructor(container: HTMLElement, productItem: IProductItem, isInBasket: boolean, protected events: IEvents) {
    super(container, productItem, events);

    this.description = ensureElement('.card__text', this.card);
    this.basketButton = ensureElement<HTMLButtonElement>('.button', this.card);

    this.description.textContent = productItem.description;
    this.basketButton.textContent = isInBasket ? 'Удалить из корзины' : 'В корзину';

    this.basketButton.addEventListener('click', () => {
      if (isInBasket) {
        this.events.emit('product:removed', { id: productItem.id });
      } else {
        this.events.emit('product:added', { id: productItem.id });
      }
    });
  }
}
