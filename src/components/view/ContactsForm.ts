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
      this.checkValidation();
    });

    this.phoneInput.addEventListener('input', () => {
      this.checkValidation();
    });

    this.form.addEventListener('submit', event => {
      event.preventDefault();

      this.events.emit('order:contacts-updated', { email: this.emailInput.value, phone: this.phoneInput.value });
    });
  }

  private checkValidation(): void {
    const errors = [];
    this.formErrors.textContent = '';

    if (this.emailInput.value === '') {
      errors.push('Не указан адрес электронной почты!');
    }

    if (this.phoneInput.value === '') {
      errors.push('Не указан номер телефона!');
    }

    if (errors.length > 0) {
      errors.forEach(err => this.formErrors.textContent += `${err}\n`);
      this.submitButton.setAttribute('disabled', 'true');
    } else {
      this.submitButton.removeAttribute('disabled');
    }
  }

  clearForm(): void {
    this.emailInput.textContent = '';
    this.phoneInput.textContent = '';
    this.formErrors.textContent = '';
  }
}
