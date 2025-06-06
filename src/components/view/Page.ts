import { IPage } from "../../types/view/types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export class Page implements IPage {
  protected page: HTMLElement;
  protected gallery: HTMLElement;
  protected basket: HTMLButtonElement;
  protected basketCounter: HTMLElement;
  private bodyScrollY: number = 0;

  constructor(container: HTMLElement, protected events: IEvents) {
    this.page = ensureElement('.page__wrapper', container);
    this.gallery = ensureElement('.gallery', this.page);
    this.basket = ensureElement<HTMLButtonElement>('.header__basket', this.page);
    this.basketCounter = ensureElement('.header__basket-counter', this.basket);

    this.basket.addEventListener('click', () => this.events.emit('basket:opened'));
  }

  renderGallery(cards: HTMLElement[]): void {
    this.gallery.replaceChildren(...cards);
  }

  renderBasket(counter: number): void {
    this.basketCounter.textContent = String(counter);
  }

  lock(value: boolean): void {
    if (value) {
      this.bodyScrollY = window.scrollY;
      this.page.classList.add('page__wrapper_locked');
      this.page.style.top = `-${this.bodyScrollY}px`; // Сдвиг по вертикали, чтобы сохранить позицию прокрутки
    } else {
      this.page.classList.remove('page__wrapper_locked');
      this.page.style.top = '';
      window.scrollTo(0, this.bodyScrollY); // Вернуть прокрутку в исходное положение
    }
  }
}
