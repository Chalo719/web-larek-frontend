export interface IPage {
  page: HTMLElement;
  gallery: HTMLElement;
  basket: HTMLButtonElement;
  basketCounter: HTMLElement;

  renderGallery(cards: HTMLElement[]): void;
  renderBasket(counter: number): void;
}

export interface IModal {
  modal: HTMLElement;
  _content: HTMLElement;
  closeButton: HTMLButtonElement;

  set content(content: HTMLElement);
  open(): void;
  close(): void;
}

export interface ICard {
  card: HTMLElement;
  title: HTMLElement;
  price: HTMLElement;

  render(): HTMLElement;
}

export interface IGalleryItem {
  category: HTMLElement;
  image: HTMLElement;
}


export interface ICardPreview {
  description: HTMLElement;
  basketButton: HTMLButtonElement;
}

export interface IBasketItem {
  index: HTMLElement;
  removeButton: HTMLButtonElement;
}

export interface IBasket {
  basket: HTMLElement;
  _products: HTMLElement[];
  productsList: HTMLElement;
  totalPrice: HTMLElement;
  orderButton: HTMLButtonElement;

  set products(products: HTMLElement[]);
  setTotalPrice(total: number): void;
  render(): HTMLElement;
}

export interface IForm {
  form: HTMLFormElement;
  submitButton: HTMLButtonElement;
  formErrors: HTMLElement;

  render(): HTMLFormElement;
}

export interface IPaymentForm {
  paymentButtons: HTMLButtonElement[];
  addressInput: HTMLInputElement;
}

export interface IContactsForm {
  emailInput: HTMLInputElement;
  phoneInput: HTMLInputElement;
}

export interface ISuccess {
  success: HTMLElement;
  description: HTMLElement;
  closeButton: HTMLButtonElement;

  render(): HTMLElement;
}
