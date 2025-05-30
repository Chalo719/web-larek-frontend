import { IPage } from "../../types/view/types";
import { ensureElement } from "../../utils/utils";

export class Page implements IPage {
  protected page: HTMLElement;
  protected gallery: HTMLElement;
  protected basket: HTMLButtonElement;
  protected basketCounter: HTMLElement;

  constructor(container: HTMLElement) {
    this.page = ensureElement('.page__wrapper', container);
    this.gallery = ensureElement('.gallery', this.page);
    this.basket = ensureElement<HTMLButtonElement>('.header__basket', this.page);
    this.basketCounter = ensureElement('.header__basket-counter', this.basket);
  }

  renderGallery(cards: HTMLElement[]): void {
    this.gallery.replaceChildren(...cards);
  }

  renderBasket(counter: number): void {
    this.basketCounter.textContent = String(counter);
  }

  lock(value: boolean): void {
    if (value) {
      this.page.classList.add('page__wrapper_locked');
    } else {
      this.page.classList.remove('page__wrapper_locked');
    }
  }
}
