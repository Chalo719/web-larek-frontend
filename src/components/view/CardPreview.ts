import { IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { GalleryItem } from "./GalleryItem";

export class CardPreview extends GalleryItem {
  protected description: HTMLElement;
  protected basketButton: HTMLButtonElement;

  constructor(container: HTMLElement, productItem: IProductItem) {
    super(container, productItem);

    this.description = ensureElement('.card__text', this.card);
    this.basketButton = ensureElement<HTMLButtonElement>('.button', this.card);

    this.description.textContent = productItem.description;
  }
}
