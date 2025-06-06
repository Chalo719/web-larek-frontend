import { PaymentMethod } from './../../types/index';
import { ensureElement } from "../../utils/utils";
import { Form } from "./Form";
import { IEvents } from '../base/events';

export class PaymentForm extends Form {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;
  private currentPaymentMethod: PaymentMethod | undefined = undefined;

  constructor(container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this.cardButton = ensureElement<HTMLButtonElement>('.button_alt[name="card"]', this.form);
    this.cashButton = ensureElement<HTMLButtonElement>('.button_alt[name="cash"]', this.form);
    this.addressInput = ensureElement<HTMLInputElement>('.form__input[name="address"]', this.form);

    this.cardButton.addEventListener('click', () => {
      this.cardButton.classList.add('button_alt-active');
      this.cashButton.classList.remove('button_alt-active');

      this.currentPaymentMethod = 'card';
      this.checkValidation();
    });

    this.cashButton.addEventListener('click', () => {
      this.cashButton.classList.add('button_alt-active');
      this.cardButton.classList.remove('button_alt-active');

      this.currentPaymentMethod = 'cash';
      this.checkValidation();
    });

    this.addressInput.addEventListener('input', () => {
      this.checkValidation();
    });

    this.form.addEventListener('submit', event => {
      event.preventDefault();

      this.events.emit('order:payment-updated', { payment: this.currentPaymentMethod, address: this.addressInput.value });
    });
  }

  private checkValidation(): void {
    const errors = [];
    this.formErrors.textContent = '';

    if (this.currentPaymentMethod === undefined) {
      errors.push('Не выбран способ оплаты!');
    }

    if (this.addressInput.value === '') {
      errors.push('Не указан адрес доставки!');
    }

    if (errors.length > 0) {
      errors.forEach(err => this.formErrors.textContent += `${err}\n`);
      this.submitButton.setAttribute('disabled', 'true');
    } else {
      this.submitButton.removeAttribute('disabled');
    }
  }

  clearForm(): void {
    this.cardButton.classList.remove('button_alt-active');
    this.cashButton.classList.remove('button_alt-active');
    this.currentPaymentMethod = undefined;
    this.addressInput.value = '';
    this.formErrors.textContent = '';
  }
}
