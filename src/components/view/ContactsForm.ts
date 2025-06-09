import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "./Form";

export class ContactsForm extends Form {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this.emailInput = ensureElement<HTMLInputElement>('.form__input[name="email"]', this.form);
    this.phoneInput = ensureElement<HTMLInputElement>('.form__input[name="phone"]', this.form);

    this.emailInput.addEventListener('input', () => {
      this.events.emit('order:contacts-changed', {
        email: this.emailInput.value,
        phone: this.phoneInput.value
      });
    });

    this.phoneInput.addEventListener('input', () => {
      this.events.emit('order:contacts-changed', {
        email: this.emailInput.value,
        phone: this.phoneInput.value
      });
    });

    this.form.addEventListener('submit', event => {
      event.preventDefault();

      this.events.emit('order:contacts-updated');
    });
  }

  clearForm(): void {
    this.emailInput.textContent = '';
    this.phoneInput.textContent = '';
    this.formErrors.textContent = '';
  }
}
