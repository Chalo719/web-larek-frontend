import { IModal } from "../../types/view/types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export class Modal implements IModal {
  protected modal: HTMLElement;
  protected _content: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    this.modal = ensureElement('.modal__container', this.container);
    this._content = ensureElement('.modal__content', this.modal);
    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.modal);

    this.container.addEventListener('click', this.close.bind(this));
    this.modal.addEventListener('click', (event) => event.stopPropagation());
    this.closeButton.addEventListener('click', this.close.bind(this));
  }

  set content(content: HTMLElement) {
    this._content.replaceChildren(content);
  }

  open(): void {
    this.container.classList.add('modal_active');

    this.events.emit('modal:opened');
  }

  close(): void {
    this.container.classList.remove('modal_active');
    this.content = null;

    this.events.emit('modal:closed');
  }
}
