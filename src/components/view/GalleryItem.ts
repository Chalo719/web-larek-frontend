import { IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Card } from "./Card";
import { CardPreview } from "./CardPreview";

const categoryClasses: Record<string, string> = {
  "софт-скил": 'card__category_soft',
  "хард-скил": 'card__category_hard',
  "другое": 'card__category_other',
  "дополнительное": 'card__category_additional',
  "кнопка": 'card__category_button'
}

export class GalleryItem extends Card {
  protected category: HTMLElement;
  protected image: HTMLImageElement;

  constructor(container: HTMLElement, productItem: IProductItem, protected events: IEvents) {
    super(container, productItem);

    this.category = ensureElement('.card__category', this.card);
    this.image = ensureElement<HTMLImageElement>('.card__image', this.card);

    this.category.textContent = productItem.category;
    this.category.classList.add(categoryClasses[productItem.category]);

    this.image.src = productItem.image;
    this.image.alt = productItem.title;

    if (this.constructor.name === 'GalleryItem')
      this.card.addEventListener('click', () => this.events.emit('card-preview:opened', { id: productItem.id }));
  }
}
