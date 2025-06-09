import { IOrderData } from "../../types";
import { IOrderModel } from "../../types/model/types";
import { IEvents } from "../base/events";

export type formType = 'payment' | 'contacts';

export class OrderModel implements IOrderModel {
  protected _order: IOrderData = {
    payment: 'card',
    address: '',
    email: '',
    phone: '',
  };
  private errors: string[] = [];

  constructor(protected events: IEvents) { }

  get order(): IOrderData {
    return this._order;
  }

  setPayment(data: Pick<IOrderData, "payment" | "address">): void {
    this._order.payment = data.payment;
    this._order.address = data.address;

    this.validatePayment();
    this.events.emit('order:changed', { isValid: this.isValid(), errors: this.errors, formType: 'payment' });
  }

  setContacts(data: Pick<IOrderData, "email" | "phone">): void {
    this._order.email = data.email;
    this._order.phone = data.phone;

    this.validateContacts();
    this.events.emit('order:changed', { isValid: this.isValid(), errors: this.errors, formType: 'contacts' });
  }

  private isValid(): boolean {
    return this.errors.length === 0;
  }

  private validatePayment(): void {
    this.errors = [];

    if (!this._order.payment) {
      this.errors.push('Не выбран способ оплаты!');
    }

    if (!this._order.address) {
      this.errors.push('Не указан адрес доставки!');
    }
  }

  private validateContacts(): void {
    this.errors = [];

    if (!this._order.email) {
      this.errors.push('Не указан адрес электронной почты!');
    }

    if (!this._order.phone) {
      this.errors.push('Не указан номер телефона!');
    }
  }
}
