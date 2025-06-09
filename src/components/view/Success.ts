import { IView } from "../../types/view/types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export class Success implements IView {
  protected success: HTMLElement;
  protected description: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    this.success = container;
    this.description = ensureElement('.order-success__description', this.success);
    this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.success);

    this.closeButton.addEventListener('click', () => this.events.emit('modal:close-request'));
  }

  setDescription(totalPrice: number): void {
    this.description.textContent = `Списано ${totalPrice} синапсов`;
  }

  render(): HTMLElement {
    return this.success;
  }
}
