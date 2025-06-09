import { IForm } from "../../types/view/types";
import { ensureElement } from "../../utils/utils";

export abstract class Form implements IForm {
  protected form: HTMLFormElement;
  protected submitButton: HTMLButtonElement;
  protected formErrors: HTMLElement;

  constructor(container: HTMLFormElement) {
    this.form = container;
    this.submitButton = ensureElement<HTMLButtonElement>('.button[type="submit"]', this.form);
    this.formErrors = ensureElement('.form__errors', this.form);
  }

  abstract clearForm(): void;

  setValidity(isValid: boolean, errors: string[]): void {
    this.formErrors.textContent = errors.join('\n');
    if (isValid) {
      this.submitButton.removeAttribute('disabled');
    } else {
      this.submitButton.setAttribute('disabled', 'true');
    }
  }

  render(): HTMLFormElement {
    return this.form;
  }
}
