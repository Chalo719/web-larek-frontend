import { IView } from "../../types/view/types";
import { ensureElement } from "../../utils/utils";

export class Success implements IView {
  protected success: HTMLElement;
  protected description: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(container: HTMLElement) {
    this.success = container;
    this.description = ensureElement('.order-success__description', this.success);
    this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.success);
  }

  render(): HTMLElement {
    return this.success;
  }
}
