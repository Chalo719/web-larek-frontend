export interface IPage {
  renderGallery(cards: HTMLElement[]): void;
  renderBasket(counter: number): void;
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
