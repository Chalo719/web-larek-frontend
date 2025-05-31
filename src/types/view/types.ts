export interface IPage {
  renderGallery(cards: HTMLElement[]): void;
  renderBasket(counter: number): void;
  lock(value: boolean): void;
}

export interface IModal {
  set content(content: HTMLElement);
  open(): void;
  close(): void;
}

export interface IView {
  render(): HTMLElement;
}

export interface IBasket {
  set products(products: HTMLElement[]);
  setTotalPrice(total: number): void;
}

export interface IForm {
  render(): HTMLFormElement;
}
