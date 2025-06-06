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

  clearForm(): void {
    // Реализуется в дочерних классах
  }

  render(): HTMLFormElement {
    return this.form;
  }
}
