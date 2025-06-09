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
      this.events.emit('order:payment-changed', {
        address: this.addressInput.value,
        payment: this.currentPaymentMethod
      });
    });

    this.cashButton.addEventListener('click', () => {
      this.cashButton.classList.add('button_alt-active');
      this.cardButton.classList.remove('button_alt-active');

      this.currentPaymentMethod = 'cash';
      this.events.emit('order:payment-changed', {
        address: this.addressInput.value,
        payment: this.currentPaymentMethod
      });
    });

    this.addressInput.addEventListener('input', () => {
      this.events.emit('order:payment-changed', {
        address: this.addressInput.value,
        payment: this.currentPaymentMethod
      });
    });

    this.form.addEventListener('submit', event => {
      event.preventDefault();

      this.events.emit('order:payment-updated');
    });
  }

  clearForm(): void {
    this.cardButton.classList.remove('button_alt-active');
    this.cashButton.classList.remove('button_alt-active');
    this.currentPaymentMethod = undefined;
    this.addressInput.value = '';
    this.formErrors.textContent = '';
  }
}
