import { ensureAllElements, ensureElement } from "../../utils/utils";
import { Form } from "./Form";

export class PaymentForm extends Form {
  protected paymentButtons: HTMLButtonElement[];
  protected addressInput: HTMLInputElement;

  constructor(container: HTMLFormElement) {
    super(container);

    this.paymentButtons = ensureAllElements('.button_alt', this.form);
    this.addressInput = ensureElement<HTMLInputElement>('.form__input[name="address"]', this.form);
  }
}
