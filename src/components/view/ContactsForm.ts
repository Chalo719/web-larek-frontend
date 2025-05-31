import { ensureElement } from "../../utils/utils";
import { Form } from "./Form";

export class ContactsForm extends Form {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(container: HTMLFormElement) {
    super(container);

    this.emailInput = ensureElement<HTMLInputElement>('.form__input[name="email"]', this.form);
    this.phoneInput = ensureElement<HTMLInputElement>('.form__input[name="phone"]', this.form);
  }
}
